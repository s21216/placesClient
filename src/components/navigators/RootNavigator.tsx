import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useAuth } from '../../helpers/contexts/AuthContext';
import { RootStackParamList } from '../../helpers/utils/types';
import BusinessSignUp from '../../screens/auth/BusinessSignUp';
import LogIn from '../../screens/auth/LogIn';
import UserSignUp from '../../screens/auth/UserSignUp';
import BusinessHome from '../../screens/business/BusinessHome';
import Home from '../../screens/user/Home';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { role } = useAuth();

  return (
    <Stack.Navigator>
      {role ? (
        role === 'USER' ? (
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
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
