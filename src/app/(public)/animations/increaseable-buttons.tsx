import { AnimatedButton } from '@/components/ui/button'
import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export const IncreaseableButtons = () => {
  const { width } = useWindowDimensions()
  const buttonsWidth = useSharedValue(120)
  const paddingX = 40

  const animatedWidth = useAnimatedStyle(() => ({
    width: buttonsWidth.value,
    maxWidth: '100%',
  }))

  const handleIncreaseButtonWidth = () => {
    if (buttonsWidth.value >= width - paddingX) return

    buttonsWidth.value = withSpring(buttonsWidth.value + 30, {
      duration: 150,
    })
  }

  const handleDecreaseButtonWidth = () => {
    if (buttonsWidth.value <= 120) return

    buttonsWidth.value = withTiming(buttonsWidth.value - 30, {
      duration: 150,
      easing: Easing.bounce,
    })
  }

  return (
    <View className='items-center w-full gap-2'>
      <AnimatedButton size='sm' style={animatedWidth} onPress={handleIncreaseButtonWidth}>
        <Text className='text-white'>Increase</Text>
      </AnimatedButton>

      <AnimatedButton size='sm' style={animatedWidth} onPress={handleDecreaseButtonWidth}>
        <Text className='text-white'>Decrease</Text>
      </AnimatedButton>
    </View>
  )
}
