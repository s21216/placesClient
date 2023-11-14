import { useMutation, useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Button, Text } from 'react-native-paper';

import { getBusinessDetails } from '../../../api/business';
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
    onError: () => Alert.alert('Too far from business.'),
  });

  const checkInStateQuery = useQuery({
    queryKey: ['checkIn', userId, route.params.businessId],
    queryFn: () => getCheckInState(userId!, route.params.businessId),
  });

  const isCheckedIn = !checkInStateQuery.data?.data;

  const onCheckInClick = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    checkInMutation.mutate({
      businessId: route.params.businessId,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={{ flex: 1 }} color="black" size={50} />
      ) : (
        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: 'white',
            }}>
            <Text variant="headlineMedium">{data?.data.name}</Text>
            <Text variant="titleSmall">
              {data?.data.type} • {data?.data.location?.address}, {data?.data.location?.city} •{' '}
              {CostEnum[data?.data.cost!]}
            </Text>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar.Text style={styles.score} size={50} label={data?.data.score!.toFixed(1)!} />
                {isCheckedIn ? (
                  <Button
                    mode="contained"
                    style={{ marginLeft: 20, backgroundColor: 'black' }}
                    onPress={() => onCheckInClick()}>
                    Check in
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    style={{ marginLeft: 20, backgroundColor: 'black' }}
                    onPress={() => navigation.navigate('Review')}>
                    Write a review
                  </Button>
                )}
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: 'white', padding: 20, marginVertical: 5 }}>
            <Text variant="headlineSmall">Reviews</Text>
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
