import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useAuth } from '../../helpers/contexts/AuthContext';
import { RootStackParamList } from '../../helpers/utils/types';
import BusinessSignUp from '../../screens/business/auth/BusinessSignUp';
import Home from '../../screens/user/app/Home';
import LogIn from '../../screens/user/auth/LogIn';
import UserSignUp from '../../screens/user/auth/UserSignUp';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
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
