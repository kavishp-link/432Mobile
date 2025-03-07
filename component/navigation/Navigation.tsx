import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import CreateProfile from '../../screens/register/CreateProfile';
import ForgetPassword from '../../screens/register/ForgetPassword';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreateProfile'
          component={CreateProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ForgetPassword'
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
