import { createStackNavigator } from '@react-navigation/stack';

import { BusinessProfileTabParamList } from '../../helpers/utils/navigationTypes';
import BusinessProfile from '../../screens/business/BusinessSettingsScreen';
import UpdatePassword from '../../screens/shared/UpdatePassword';

const Stack = createStackNavigator<BusinessProfileTabParamList>();

const BusinessProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="BusinessProfile"
        component={BusinessProfile}
        options={{ headerTitle: 'Profile', headerShown: false, headerTintColor: 'black' }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{ headerTitle: '', headerShown: true, headerTintColor: 'black' }}
      />
    </Stack.Navigator>
  );
};

export default BusinessProfileStack;
