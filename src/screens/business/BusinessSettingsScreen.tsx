import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBusinessDetails } from '../../api/business';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { BusinessProfileScreenProps } from '../../helpers/utils/navigationTypes';

const BusinessProfile = ({ navigation }: BusinessProfileScreenProps) => {
  const insets = useSafeAreaInsets();
  const { currentUser, signOut } = useAuth();
  const onSignOutPress = async () => {
    await signOut();
  };

  const { data } = useQuery({
    queryKey: ['business', currentUser?.uid],
    queryFn: () => getBusinessDetails(currentUser?.uid!),
  });

  const options = [
    { name: 'Update email', textColor: 'black', fn: () => {} },
    {
      name: 'Change password',
      textColor: 'black',
      fn: () => navigation.navigate('UpdatePassword'),
    },
    { name: 'Log out', textColor: 'red', fn: onSignOutPress },
  ];

  return (
    <View>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text variant="displaySmall">{data?.data.name}</Text>
        <View style={styles.row}>
          <View style={styles.center}>
            <Text variant="headlineMedium">{data?.data.numberOfVisitors}</Text>
            <Text variant="titleLarge">Visitors</Text>
          </View>
          <View style={styles.center}>
            <Text variant="headlineMedium">{data?.data.numberOfReviews}</Text>
            <Text variant="titleLarge">Reviews</Text>
          </View>
        </View>
      </View>
      <Divider />
      <View style={styles.scrollview}>
        {options.map((option) => (
          <View key={option.name}>
            <TouchableHighlight style={styles.field} underlayColor="#e6e6e6" onPress={option.fn}>
              <Text style={{ color: option.textColor }} variant="labelLarge">
                {option.name}
              </Text>
            </TouchableHighlight>
            <Divider />
          </View>
        ))}
      </View>
    </View>
  );
};

export default BusinessProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  scrollview: {
    height: '100%',
    backgroundColor: 'white',
  },
});
