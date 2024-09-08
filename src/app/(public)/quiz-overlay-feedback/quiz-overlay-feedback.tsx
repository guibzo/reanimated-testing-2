import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

export const QuizOverlayFeedback = ({ answer }: { answer: 'correct' | 'incorrect' | 'idle' }) => {
  const { width, height } = useWindowDimensions()
  const opacity = useSharedValue(0)

  const layoutColor =
    answer === 'correct' ? '#22c55e' : answer === 'incorrect' ? '#ef4444' : 'transparent'

  const animatedLayoutStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, {
        duration: 400,
        easing: Easing.bounce,
      }),
      withTiming(0)
    )
  }, [answer])

  return (
    <Animated.View style={animatedLayoutStyle} className='absolute w-screen h-screen'>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={layoutColor}>
          <BlurMask blur={50} style='inner' />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
