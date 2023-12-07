import { createStackNavigator } from '@react-navigation/stack';

import BusinessDetailsStack from './BusinessDetailsStack';
import { SearchTabParamList } from '../../helpers/utils/navigationTypes';
import SearchScreen from '../../screens/user/searchTab/SearchScreen';

const Stack = createStackNavigator<SearchTabParamList>();

const SearchStack = () => {
  const businessDetailsStack = BusinessDetailsStack(Stack);
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black' }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false, headerTintColor: 'black' }}
      />
      {businessDetailsStack}
    </Stack.Navigator>
  );
};

export default SearchStack;
