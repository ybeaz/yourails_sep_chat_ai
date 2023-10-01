import { registerRootComponent } from 'expo'
import { AppRegistry, Platform } from 'react-native'
import React, { StrictMode, useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './DataLayer/store'
import { NavigationWeb } from './Navigation/NavigationWeb'
import { NavigationMobile } from './Navigation/NavigationMobile'

SplashScreen.preventAutoHideAsync()

function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Regular':
      'https://yourails.com/fonts/Roboto-Regular.ttf' /* Option that should be tested: require('./assets/fonts/Roboto-Regular.ttf'), */,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    return null
  }

  console.info('App [30]', { 'Platform.OS': Platform.OS })

  if (Platform.OS === 'web') {
    return (
      <StrictMode>
        <Provider store={store}>
          <NavigationWeb />
        </Provider>
      </StrictMode>
    )
  } else {
    return (
      <StrictMode>
        <SafeAreaProvider>
          <Provider store={store}>
            <NavigationMobile onLayout={onLayoutRootView} />
          </Provider>
        </SafeAreaProvider>
      </StrictMode>
    )
  }
}

if (Platform.OS === 'web') {
  registerRootComponent(App)
} else {
  AppRegistry.registerComponent('main', () => App)
}
