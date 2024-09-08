import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const ProgressBar = () => {
  const progress = 30
  const percentage = Math.round(progress)

  const sharedPercentage = useSharedValue(percentage)

  const animatedPercentage = useAnimatedStyle(() => {
    return {
      width: `${sharedPercentage.value}%`,
    }
  })

  const handleIncrease = () => {
    if (sharedPercentage.value + 10 >= 100) {
      return (sharedPercentage.value = withTiming(100, {
        duration: 150,
        easing: Easing.bounce,
      }))
    }

    sharedPercentage.value = withTiming(sharedPercentage.value + 10, {
      duration: 150,
      easing: Easing.bounce,
    })
  }

  const handleDecrease = () => {
    if (sharedPercentage.value - 10 <= 0) {
      return (sharedPercentage.value = withTiming(0, {
        duration: 150,
        easing: Easing.bounce,
      }))
    }

    sharedPercentage.value = withTiming(sharedPercentage.value - 10, {
      duration: 150,
      easing: Easing.bounce,
    })
  }

  useEffect(() => {
    sharedPercentage.value = withTiming(percentage)
  }, [percentage])

  return (
    <View className='w-full gap-2 border-2 rounded-md border-border'>
      <Animated.View className='h-2 bg-red-500 rounded-md' style={animatedPercentage} />

      <View className='flex flex-row w-full gap-2'>
        <Button onPress={handleIncrease} className='flex-1 w-auto'>
          <Text>+</Text>
        </Button>

        <Button onPress={handleDecrease} className='flex-1 w-auto'>
          <Text>-</Text>
        </Button>
      </View>
    </View>
  )
}
