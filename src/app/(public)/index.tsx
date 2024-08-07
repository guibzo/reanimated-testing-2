import { Button } from '@/components/ui/button'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className='flex flex-1 w-full max-w-5xl p-5 mx-auto'>
        <Text className='text-3xl font-bold'>Hello World!</Text>
        <Text className='text-lg font-medium'>
          Template Expo Router + NativeWind + RN Reusables
        </Text>

        <Button size='sm'>
          <Text className='text-white'>Press me</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}
