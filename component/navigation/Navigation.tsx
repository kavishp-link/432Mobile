import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CollectorsVault,
  CreateProfile,
  ForgetPassword,
  Galleria,
  GalleriaCardDetails,
  Login,
  Register,
  Home,
  Profile,
} from '../../screens';

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
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CollectorsVault'
          component={CollectorsVault}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Galleria'
          component={Galleria}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='GalleriaCardDetails'
          component={GalleriaCardDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
