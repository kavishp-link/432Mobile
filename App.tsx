import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AUTH_STORE_KEY, authReducer } from './redux/authStore';
import { Navigation } from './component/navigation/Navigation';
import { initFonts } from './assets/fonts';
import { GLOBAL_STORE_KRY, globalReducer } from './redux/globalStore';

export default function App() {
  const fontsLoaded = initFonts();
  const Store = configureStore({
    reducer: {
      [AUTH_STORE_KEY]: authReducer,
      [GLOBAL_STORE_KRY]: globalReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  return (
    <Provider store={Store}>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
