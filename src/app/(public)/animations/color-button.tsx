import { AnimatedButton } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const ColorButton = () => {
  const [isToggled, setIsToggled] = useState(true)
  const isToggledAnimated = useSharedValue(1)

  const animatedButtonBG = useAnimatedStyle(() => ({
    borderColor: interpolateColor(isToggledAnimated.value, [0, 1], ['#f00', '#0f0']),
  }))

  const animatedText = useAnimatedStyle(() => ({
    color: interpolateColor(isToggledAnimated.value, [0, 1], ['#f00', '#0f0']),
  }))

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  useEffect(() => {
    isToggledAnimated.value = withTiming(isToggled ? 1 : 0)
  }, [isToggled])

  return (
    <AnimatedButton onPress={handleToggle} style={animatedButtonBG} className='border'>
      <Animated.Text style={animatedText}>Change color</Animated.Text>
    </AnimatedButton>
  )
}
