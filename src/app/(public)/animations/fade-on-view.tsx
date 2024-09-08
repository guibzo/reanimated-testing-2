import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useState } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  RotateInUpLeft,
  RotateOutUpRight,
} from 'react-native-reanimated'

export const FadeOnView = () => {
  const [showDefaultFade, setShowDefaultFade] = useState(true)
  const [showDropFade, setShowDropFade] = useState(true)
  const [showRotateFade, setShowRotateFade] = useState(true)

  return (
    <View className='flex flex-col gap-2'>
      <View className='flex-row items-center gap-3'>
        <Button onPress={() => setShowDefaultFade((prev) => !prev)}>
          <Text>{showDefaultFade ? 'Fade out' : 'Fade in'}</Text>
        </Button>

        {showDefaultFade && (
          <Animated.View className='w-10 h-10 bg-orange-400' entering={FadeIn} exiting={FadeOut} />
        )}
      </View>

      <View className='flex-row items-center gap-3'>
        <Button onPress={() => setShowDropFade((prev) => !prev)}>
          <Text>{showDropFade ? 'Fade out' : 'Fade in'}</Text>
        </Button>

        {showDropFade && (
          <Animated.View
            className='w-10 h-10 bg-orange-400'
            entering={FadeInUp}
            exiting={FadeOutUp}
          />
        )}
      </View>
      <View className='flex-row items-center gap-3'>
        <Button onPress={() => setShowRotateFade((prev) => !prev)}>
          <Text>{showRotateFade ? 'Fade out' : 'Fade in'}</Text>
        </Button>

        {showRotateFade && (
          <Animated.View
            className='w-10 h-10 bg-orange-400'
            entering={RotateInUpLeft.duration(300).easing(Easing.linear)}
            exiting={RotateOutUpRight.duration(300).easing(Easing.linear)}
          />
        )}
      </View>
    </View>
  )
}
