import { useColorScheme } from '@/hooks/use-color-scheme'
import { NAV_THEME } from '@/styles/constants'
import '@/styles/global.css'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type Theme, ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
export { ErrorBoundary } from 'expo-router'

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  // const [loaded, error] = useFonts({
  // 	Nunito_400Regular,
  // 	Nunito_900Black,
  // 	Nunito_700Bold,
  // 	Nunito_600SemiBold,
  // 	Nunito_500Medium,
  // 	Nunito_800ExtraBold,
  // 	Inter_400Regular,
  // 	Inter_900Black,
  // 	Inter_700Bold,
  // 	Inter_500Medium,
  // 	Inter_800ExtraBold,
  // 	Inter_600SemiBold,
  // });

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)

  // @ts-ignore
  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem('theme')

      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background')
      }

      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }

      const colorTheme = 'light'

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)

        setIsColorSchemeLoaded(true)
        return
      }

      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  // useEffect(() => {
  //   if (error) throw error
  // }, [error])

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />

          {/* <PortalHost /> */}
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
