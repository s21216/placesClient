import { getAuth } from 'firebase/auth';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { useAuth } from '../../helpers/contexts/AuthContext';
import { HomeProps } from '../../helpers/utils/types';

const Home = ({ navigation }: HomeProps) => {
  const { currentUser, signOut } = useAuth();
  const onSignOutPress = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Hi {currentUser?.email}!</Text>
      <Button mode="contained" onPress={onSignOutPress}>
        Log out
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    padding: 10,
  },
  input: {
    margin: 5,
    width: '70%',
  },
  button: {
    margin: 5,
    padding: 5,
    width: '70%',
  },
});
