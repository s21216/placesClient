import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getUserInfo } from '../../../api/user';
import { useAuth } from '../../../helpers/contexts/AuthContext';
import { ProfileProps } from '../../../helpers/utils/navigationTypes';

const Profile = ({ navigation }: ProfileProps) => {
  const insets = useSafeAreaInsets();
  const { currentUser, signOut } = useAuth();
  const onSignOutPress = async () => {
    await signOut();
  };

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(currentUser?.uid!),
  });

  const options = [
    { name: 'Visited', textColor: 'black', fn: () => navigation.navigate('Visited') },
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
        <Text variant="displaySmall">{data?.data.username}</Text>
        <View style={styles.row}>
          <View style={styles.center}>
            <Text variant="headlineMedium">{data?.data.numberOfCheckIns}</Text>
            <Text variant="titleLarge">Check ins</Text>
          </View>
          <View style={styles.center}>
            <Text variant="headlineMedium">{data?.data.numberOfReviews}</Text>
            <Text variant="titleLarge">Reviews</Text>
          </View>
        </View>
      </View>
      <Divider />
      <ScrollView style={styles.scrollview}>
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
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
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
