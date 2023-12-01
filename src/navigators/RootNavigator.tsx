import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import BusinessTabNavigator from './business/BusinessTabNavigator';
import UserTabNavigator from './user/UserTabNavigator';
import { useAuth } from '../helpers/contexts/AuthContext';
import { BusinessSignUpProvider } from '../helpers/contexts/BusinessSignUpContext';
import { RootStackParamList } from '../helpers/utils/navigationTypes';
import BusinessSignUp from '../screens/auth/BusinessSignUp';
import BusinessSignUpLocation from '../screens/auth/BusinessSignUpLocation';
import LogIn from '../screens/auth/LogIn';
import UserSignUp from '../screens/auth/UserSignUp';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { currentUser, role, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  }

  return (
    <BusinessSignUpProvider>
      <Stack.Navigator>
        {currentUser === undefined ? (
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
              name="UserSignUp"
              component={UserSignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BusinessSignUp"
              component={BusinessSignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BusinessSignUpLocation"
              component={BusinessSignUpLocation}
              options={{ headerShown: true, headerTitle: 'Set your business location' }}
            />
          </>
        ) : role === 'USER' ? (
          <Stack.Screen
            name="UserStack"
            component={UserTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="BusinessStack"
            component={BusinessTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </BusinessSignUpProvider>
  );
};

export default RootNavigator;
