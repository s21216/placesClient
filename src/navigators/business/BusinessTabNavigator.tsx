import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BusinessHomeStack from './BusinessHomeStack';
import BusinessProfileStack from './BusinessProfileStack';
import BusinessReviewStack from './BusinessReviewStack';
import { BusinessNavigatorParamList } from '../../helpers/utils/navigationTypes';

const Tab = createBottomTabNavigator<BusinessNavigatorParamList>();

function BusinessTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="BusinessHomeTab"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'lightgray',
      }}>
      <Tab.Screen
        name="BusinessHomeTab"
        component={BusinessHomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ReviewTab"
        component={BusinessReviewStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="rate-review" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={BusinessProfileStack}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BusinessTabNavigator;
