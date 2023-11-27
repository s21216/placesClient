import { createStackNavigator } from '@react-navigation/stack';

import { BusinessHomeTabParamList } from '../../helpers/utils/navigationTypes';
import BusinessHomeScreen from '../../screens/business/BusinessHomeScreen';

const Stack = createStackNavigator<BusinessHomeTabParamList>();

const BusinessHomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BusinessHomeScreen"
        component={BusinessHomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Your page',
        }}
      />
    </Stack.Navigator>
  );
};

export default BusinessHomeStack;
