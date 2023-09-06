import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useAuth } from '../../helpers/contexts/AuthContext';
import { RootStackParamList } from '../../helpers/utils/types';
import Home from '../../screens/app/Home';
import LogIn from '../../screens/auth/LogIn';
import SignUp from '../../screens/auth/SignUp';

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
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false, title: 'Sign up' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
