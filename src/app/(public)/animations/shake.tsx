import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

export const Shake = () => {
  const shake = useSharedValue(0)

  const shakeAnimation = () => {
    shake.value = withSequence(
      withTiming(3, { easing: Easing.bounce, duration: 300 }),
      withTiming(0, { easing: Easing.bounce, duration: 300 })
    )
  }

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(shake.value, [0, 1.5, 2, 3], [0, -15, 15, 0]),
        },
      ],
    }
  })

  return (
    <Animated.View className='p-2 rounded-md bg-zinc-500' style={shakeStyle}>
      <Button onPress={shakeAnimation}>
        <Text>Shake</Text>
      </Button>
    </Animated.View>
  )
}
