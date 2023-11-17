import { createStackNavigator } from '@react-navigation/stack';

import { SearchTabParamList } from '../../../helpers/utils/navigationTypes';
import BusinessDetails from '../../../screens/user/searchTab/BusinessDetails';
import ReviewScreen from '../../../screens/user/searchTab/ReviewScreen';
import SearchScreen from '../../../screens/user/searchTab/SearchScreen';

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
        name="Review"
        component={ReviewScreen}
        options={{
          headerShown: true,
          headerTitle: 'Write review',
          headerBackTitleStyle: { color: 'black' },
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
