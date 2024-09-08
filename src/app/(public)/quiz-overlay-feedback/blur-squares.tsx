import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'
import { useWindowDimensions } from 'react-native'
import Animated from 'react-native-reanimated'

export const BlurSquares = () => {
  const { width, height } = useWindowDimensions()

  return (
    <Animated.View className='flex-1 w-full'>
      <Canvas style={{ flex: 1 }}>
        <Rect x={70} y={70} width={100} height={100} color='purple'>
          <BlurMask blur={50} style='solid' />
        </Rect>

        <Rect x={200} y={220} width={100} height={100} color='purple'>
          <BlurMask blur={50} style='normal' />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
