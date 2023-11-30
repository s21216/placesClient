import { Ionicons, Entypo } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Chip, Text, Button as StyledButton } from 'react-native-paper';

import { getBusinessDetails } from '../../../api/business';
import { useAuth } from '../../../helpers/contexts/AuthContext';
import { BusinessHomeScreenProps } from '../../../helpers/utils/navigationTypes';
import { CostEnum } from '../../../helpers/utils/types';

const BusinessHomeScreen = ({ navigation }: BusinessHomeScreenProps) => {
  const { currentUser } = useAuth();
  const businessId = currentUser?.uid;

  const { data, isFetching } = useQuery({
    queryKey: ['details'],
    queryFn: () => getBusinessDetails(businessId!),
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('BusinessEditDetails')} title="Edit" />
      ),
    });
  }, [data, navigation]);

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator style={styles.container} color="black" size={50} />
      ) : (
        <ScrollView overScrollMode="always">
          <View style={styles.section}>
            <Text variant="headlineMedium">{data?.data.name}</Text>
            <Text variant="titleSmall">
              {data?.data.type} • {data?.data.location?.address} • {CostEnum[data?.data.cost!]}
            </Text>
            <View style={{ marginTop: 10 }}>
              <View style={styles.row}>
                <Avatar.Text
                  style={styles.score}
                  size={50}
                  label={data?.data.score ? data.data.score?.toFixed(1) : 'N/A'}
                />
                <StyledButton
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('BusinessLocation', {
                      businessId: currentUser?.uid!,
                    })
                  }
                  buttonColor="black">
                  <Ionicons name="location-sharp" size={20} color="white" />
                </StyledButton>
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
          {data?.data.categories?.length !== 0 && (
            <View style={styles.section}>
              <Text variant="headlineSmall">Categories</Text>
              <View style={styles.wrap}>
                {data?.data.categories?.map((category) => (
                  <Chip key={category.id} style={styles.category}>
                    {category.name}
                  </Chip>
                ))}
              </View>
            </View>
          )}
          {data?.data.attributes?.length !== 0 && (
            <View style={styles.section}>
              <Text variant="headlineSmall">More about business</Text>
              <View style={styles.wrap}>
                {data?.data.attributes?.map((attribute) => (
                  <View key={attribute.id} style={styles.attribute}>
                    <Ionicons name="checkmark" size={20} />
                    <Text>{attribute.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default BusinessHomeScreen;

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
  readAll: {
    alignItems: 'center',
    padding: 20,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  category: {
    marginHorizontal: 5,
  },
});
