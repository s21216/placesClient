import { createStackNavigator } from '@react-navigation/stack';

import { SearchTabParamList } from '../../../helpers/utils/types';
import SearchScreen from '../../../screens/user/searchTab/SearchScreen';

const Stack = createStackNavigator<SearchTabParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
