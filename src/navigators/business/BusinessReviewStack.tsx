import { createStackNavigator } from '@react-navigation/stack';

import { BusinessReviewTabParamList } from '../../helpers/utils/navigationTypes';
import BusinessReviewScreen from '../../screens/business/BusinessReviewScreen';

const Stack = createStackNavigator<BusinessReviewTabParamList>();

const BusinessReviewStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BusinessReviewScreen"
        component={BusinessReviewScreen}
        options={{
          headerShown: true,
          headerTitle: 'Reviews',
        }}
      />
    </Stack.Navigator>
  );
};

export default BusinessReviewStack;
