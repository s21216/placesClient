import { Ionicons, Entypo } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Button, Text } from 'react-native-paper';

import { getBusinessDetails, getBusinessReviews } from '../../../api/business';
import { getCheckInState, postCheckIn } from '../../../api/user';
import { useAuth } from '../../../helpers/contexts/AuthContext';
import { DetailsProps } from '../../../helpers/utils/navigationTypes';
import { CostEnum } from '../../../helpers/utils/types';

const BusinessDetails = ({ navigation, route }: DetailsProps) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const { data, isFetching } = useQuery({
    queryKey: ['details'],
    queryFn: () => getBusinessDetails(route.params.businessId),
  });

  const checkInMutation = useMutation({
    mutationFn: postCheckIn,
    onSuccess: () => {
      Alert.alert('Checked in!');
      checkInStateQuery.refetch();
    },
    onError: (error: any) => Alert.alert(error.response.data),
  });

  const checkInStateQuery = useQuery({
    queryKey: ['checkIn', userId, route.params.businessId],
    queryFn: () => getCheckInState(userId!, route.params.businessId),
  });

  const isCheckedIn = !checkInStateQuery.data?.data;

  const getReviewsQuery = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      getBusinessReviews(route.params.businessId, {
        pageSize: 10,
        pageNumber: 0,
        orderBy: '',
        sortOrder: 'ASC',
      }),
  });

  const onCheckInClick = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    console.log(location);
    checkInMutation.mutate({
      businessId: route.params.businessId,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={styles.container} color="black" size={50} />
      ) : (
        <ScrollView>
          <View style={styles.section}>
            <Text variant="headlineMedium">{data?.data.name}</Text>
            <Text variant="titleSmall">
              {data?.data.type} • {data?.data.location?.address}, {data?.data.location?.city} •{' '}
              {CostEnum[data?.data.cost!]}
            </Text>
            <View style={{ marginTop: 10 }}>
              <View style={styles.row}>
                <Avatar.Text style={styles.score} size={50} label={data?.data.score!.toFixed(1)!} />
                {isCheckedIn ? (
                  <Button mode="contained" style={styles.button} onPress={() => onCheckInClick()}>
                    Check in
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('Review', {
                        businessId: route.params.businessId,
                        businessName: data?.data.name!,
                      })
                    }>
                    Write a review
                  </Button>
                )}
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text variant="headlineSmall">Info</Text>
            <Text>{data?.data.description}</Text>
            <View style={styles.row}>
              <Ionicons name="call" color="black" size={20} />
              <Text style={{ padding: 10 }} selectable>
                {data?.data.phoneNumber}
              </Text>
            </View>
            <View style={styles.row}>
              <Entypo name="email" color="black" size={20} />
              <Text style={{ padding: 10 }} selectable>
                {data?.data.email}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text variant="headlineSmall">Reviews</Text>
            {getReviewsQuery.data?.data.results?.length === 0 && <Text>No reviews yet</Text>}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default BusinessDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 20,
    backgroundColor: 'black',
  },
  headerRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: 50,
  },
  score: {
    backgroundColor: 'black',
  },
});
