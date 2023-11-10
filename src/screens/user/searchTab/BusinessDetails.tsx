import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Button, Text } from 'react-native-paper';

import { getBusinessDetails } from '../../../api/business';
import { DetailsProps } from '../../../helpers/utils/navigationTypes';
import { CostEnum } from '../../../helpers/utils/types';

const BusinessDetails = ({ route }: DetailsProps) => {
  const { data, isFetching } = useQuery({
    queryKey: ['details'],
    queryFn: () => getBusinessDetails(route.params.businessId),
  });
  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={{ flex: 1 }} color="black" size={50} />
      ) : (
        <ScrollView style={{}}>
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
                <Button
                  mode="contained"
                  style={{ marginLeft: 20, backgroundColor: 'black' }}
                  onPress={() => console.log('click')}>
                  Check in
                </Button>
                <Button
                  mode="contained"
                  style={{ marginLeft: 20, backgroundColor: 'black' }}
                  onPress={() => console.log('click')}>
                  Write a review
                </Button>
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
