import { createStackNavigator } from '@react-navigation/stack';

import BusinessDetailsStack from './BusinessDetailsStack';
import { ProfileTabParamList } from '../../helpers/utils/navigationTypes';
import Profile from '../../screens/user/profileTab/Profile';
import Visited from '../../screens/user/profileTab/Visited';

const Stack = createStackNavigator<ProfileTabParamList>();

const ProfileStack = () => {
  const businessDetailsStack = BusinessDetailsStack(Stack);

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, headerTintColor: 'black' }}
      />
      <Stack.Screen
        name="Visited"
        component={Visited}
        options={{ headerTitle: 'Visited', headerShown: true, headerTintColor: 'black' }}
      />
      {businessDetailsStack}
    </Stack.Navigator>
  );
};

export default ProfileStack;
