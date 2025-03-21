import React, { useEffect, useState } from 'react';
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
  WorkspaceScreen,
  WorkspaceGraph,
  FrequencyBaazaar,
  Plaza,
  Genres,
  MusicWorld,
  Details,
  Studio,
} from '../../screens';
import ThemePreview from '../customComponent/ThemePreview';
import { load } from '../helper/storage';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authStoreActions } from '../../redux/authStore';
import { ScheduleLaunch } from '../../screens/scheduleLaunch/ScheduleLaunch';

const Stack = createStackNavigator();

export const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser: any = await load('currentUser');
        setProfileType(
          currentUser?.userProfile?.profileType
            ? currentUser.userProfile?.profileType
            : ''
        );
        dispatch(authStoreActions.setUserDetails(currentUser));
        if (currentUser?.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        // }
      } catch (error) {
        console.error('Error checking current user:', error);
      } finally {
        setLoading(false);
      }
    };
    checkCurrentUser();
  }, []);

  if (loading) {
    return null;
    // return <View style={{ flex: 1, backgroundColor: "red" }} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn ? (profileType ? 'Home' : 'CreateProfile') : 'Login'
        }
      >
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
        <Stack.Screen
          name='WorkspaceScreen'
          component={WorkspaceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='WorkspaceGraph'
          component={WorkspaceGraph}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FrequencyBaazaar'
          component={FrequencyBaazaar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Plaza'
          component={Plaza}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Genres'
          component={Genres}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MusicWorld'
          component={MusicWorld}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ThemePreview'
          component={ThemePreview}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen
          name='Details'
          component={Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Studio'
          component={Studio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ScheduleLaunch'
          component={ScheduleLaunch}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
