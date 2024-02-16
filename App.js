/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AppNav from './source/Navigation/AppNav';
import { colors } from './source/Assets';
import { request, PERMISSIONS } from 'react-native-permissions';
import Store, { persistor } from './source/Redux/Store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getLocation } from 'react-native-weather-api';


const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      const permission = request(PERMISSIONS.ANDROID.CAMERA);
      getLocation()
      // const location = request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

  }, []);

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.appStyle}>
        <PersistGate persistor={persistor}>
          <Provider store={Store}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={colors.white}
            />

            <AppNav />
          </Provider>
        </PersistGate>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
  },
});


export default App;
