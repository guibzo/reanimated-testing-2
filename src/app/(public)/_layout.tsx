import { Stack } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PublicLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className='flex flex-1 w-full max-w-5xl p-5 mx-auto overflow-y-scroll'>
        <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
          <Stack.Screen name='index' />
          <Stack.Screen name='skia/index' />
        </Stack>
      </View>
    </SafeAreaView>
  )
}
