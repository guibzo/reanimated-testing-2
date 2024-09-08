import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Canvas, Path, Skia } from '@shopify/react-native-skia'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'

const CIRCLE_SIZE = 28
const CIRCLE_STROKE_WIDTH = 2

export const SkiaPath = () => {
  const [isChecked, setIsChecked] = useState(false)

  const skiaPath = Skia.Path.Make()

  const progressPercentage = useSharedValue(0)

  useEffect(() => {
    if (isChecked) {
      withTiming((progressPercentage.value = 1))
      return
    }

    withTiming((progressPercentage.value = 0))
  }, [isChecked])

  return (
    <View className='items-center justify-center flex-1'>
      <Canvas style={{ height: CIRCLE_SIZE * 2, width: CIRCLE_SIZE * 2 }}>
        <Path path={skiaPath} color={'#f00'} style='stroke' strokeWidth={CIRCLE_STROKE_WIDTH} />

        <Path
          path={skiaPath}
          color={'#f00'}
          style='stroke'
          strokeWidth={CIRCLE_STROKE_WIDTH}
          start={0}
          end={progressPercentage.value}
        />
      </Canvas>

      <Button onPress={() => setIsChecked(!isChecked)} className='mt-auto'>
        <Text>Toggle check</Text>
      </Button>
    </View>
  )
}
