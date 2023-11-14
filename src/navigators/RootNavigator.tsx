import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import UserTabNavigator from './user/UserTabNavigator';
import { useAuth } from '../helpers/contexts/AuthContext';
import { RootStackParamList } from '../helpers/utils/navigationTypes';
import BusinessSignUp from '../screens/auth/BusinessSignUp';
import LogIn from '../screens/auth/LogIn';
import UserSignUp from '../screens/auth/UserSignUp';
import BusinessHome from '../screens/business/BusinessHome';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { currentUser, role } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        role === 'USER' ? (
          <Stack.Screen
            name="UserStack"
            component={UserTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="BusinessHome"
            component={BusinessHome}
            options={{ headerShown: false }}
          />
        )
      ) : (
        <>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen name="UserSignUp" component={UserSignUp} options={{ headerShown: false }} />
          <Stack.Screen
            name="BusinessSignUp"
            component={BusinessSignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
