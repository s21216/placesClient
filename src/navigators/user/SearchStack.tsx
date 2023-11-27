import { createStackNavigator } from '@react-navigation/stack';

import { SearchTabParamList } from '../../helpers/utils/navigationTypes';
import BusinessDetails from '../../screens/user/searchTab/BusinessDetails';
import PostReview from '../../screens/user/searchTab/PostReview';
import ReviewList from '../../screens/user/searchTab/ReviewList';
import SearchScreen from '../../screens/user/searchTab/SearchScreen';

const Stack = createStackNavigator<SearchTabParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Details"
        component={BusinessDetails}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Search',
          headerBackTitleStyle: { color: 'black' },
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
    </Stack.Navigator>
  );
};

export default SearchStack;
