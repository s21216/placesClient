import { createStackNavigator } from '@react-navigation/stack';

import { SearchTabParamList } from '../../../helpers/utils/types';
import BusinessList from '../../../components/searchTab/BusinessList';
import BusinessMap from '../../../screens/user/searchTab/BusinessMap';
import SearchScreen from '../../../screens/user/searchTab/SearchScreen';

const Stack = createStackNavigator<SearchTabParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={SearchScreen} />
      <Stack.Screen
        name="BusinessList"
        component={BusinessList}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="BusinessMap" component={BusinessMap} />
    </Stack.Navigator>
  );
};

export default SearchStack;
