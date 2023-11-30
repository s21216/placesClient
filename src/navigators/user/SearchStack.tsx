import { createStackNavigator } from '@react-navigation/stack';

import { SearchTabParamList } from '../../helpers/utils/navigationTypes';
import BusinessLocationScreen from '../../screens/shared/BusinessLocationScreen';
import BusinessDetails from '../../screens/user/searchTab/BusinessDetails';
import PostReview from '../../screens/user/searchTab/PostReview';
import ReviewList from '../../screens/user/searchTab/ReviewList';
import SearchScreen from '../../screens/user/searchTab/SearchScreen';

const Stack = createStackNavigator<SearchTabParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false, headerTintColor: 'black' }}
      />
      <Stack.Screen
        name="Details"
        component={BusinessDetails}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Search',
          headerStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name="PostReview"
        component={PostReview}
        options={{
          headerShown: true,
          headerTitle: 'Write review',
          headerBackTitleStyle: { color: 'black' },
        }}
      />
      <Stack.Screen
        name="ReviewList"
        component={ReviewList}
        options={{
          headerShown: true,
          headerTitle: 'Reviews',
          headerBackTitleStyle: { color: 'black' },
        }}
      />
      <Stack.Screen
        name="BusinessLocation"
        component={BusinessLocationScreen}
        options={{
          headerShown: true,
          headerTitle: 'Location',
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
