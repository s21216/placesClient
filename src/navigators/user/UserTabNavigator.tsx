import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchStack from './search/SearchStack';
import { UserNavigatorParamList } from '../../helpers/utils/types';
import Home from '../../screens/user/Home';

const Tab = createBottomTabNavigator<UserNavigatorParamList>();

function UserTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Map">
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default UserTabNavigator;
