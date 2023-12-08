import { createStackNavigator } from '@react-navigation/stack';

import { BusinessReviewTabParamList } from '../../helpers/utils/navigationTypes';
import BusinessReviewReplyScreen from '../../screens/business/reviewsTab/BusinessReviewReplyScreen';
import BusinessReviewScreen from '../../screens/business/reviewsTab/BusinessReviewScreen';

const Stack = createStackNavigator<BusinessReviewTabParamList>();

const BusinessReviewStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="BusinessReviewList"
        component={BusinessReviewScreen}
        options={{
          headerShown: true,
          headerTitle: 'Reviews',
        }}
      />
      <Stack.Screen
        name="BusinessReviewReply"
        component={BusinessReviewReplyScreen}
        options={{
          headerShown: true,
          headerTitle: 'Reply',
        }}
      />
    </Stack.Navigator>
  );
};

export default BusinessReviewStack;
