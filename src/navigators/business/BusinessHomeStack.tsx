import { createStackNavigator } from '@react-navigation/stack';

import { BusinessHomeTabParamList } from '../../helpers/utils/navigationTypes';
import LocationPicker from '../../screens/business/LocationPicker';
import BusinessEditDetailsScreen from '../../screens/business/businessDetails/BusinessEditDetailsScreen';
import BusinessHomeScreen from '../../screens/business/businessDetails/BusinessHomeScreen';

const Stack = createStackNavigator<BusinessHomeTabParamList>();

const BusinessHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="BusinessHomeScreen"
        component={BusinessHomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Your page',
        }}
      />
      <Stack.Screen
        name="BusinessEditDetails"
        component={BusinessEditDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Edit your details',
        }}
      />
      <Stack.Screen
        name="BusinessPickLocation"
        component={LocationPicker}
        options={{
          headerShown: true,
          headerTitle: 'Pick location',
        }}
      />
    </Stack.Navigator>
  );
};

export default BusinessHomeStack;
