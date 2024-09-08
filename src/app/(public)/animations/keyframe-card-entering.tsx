import { Button } from '@/components/ui/button'
import { AnimatedCard, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { Keyframe } from 'react-native-reanimated'

export const KeyframeCardEntering = () => {
  const [isFlashing, setIsFlashing] = useState(false)
  const [showCard, setShowCard] = useState(true)

  const SCREEN_WIDTH = useWindowDimensions().width

  const enteringKeyFrame = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateX: SCREEN_WIDTH }, { rotate: '90deg' }],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
  })

  const exitingKeyFrame = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
    to: {
      opacity: 0,
      transform: [{ translateX: -SCREEN_WIDTH }, { rotate: '-90deg' }],
    },
  })

  const handleFlashCard = () => {
    if (isFlashing) return

    setIsFlashing(true)

    setShowCard((prev) => !prev)

    setTimeout(() => {
      setShowCard((prev) => !prev)
      setIsFlashing(false)
    }, 500)
  }

  return (
    <View className='gap-2'>
      <Button className='w-full' onPress={handleFlashCard}>
        <Text>Show Card</Text>
      </Button>

      {showCard && (
        <AnimatedCard className='bg-red-500' entering={enteringKeyFrame} exiting={exitingKeyFrame}>
          <CardContent>
            <Text>Card testing</Text>
          </CardContent>
        </AnimatedCard>
      )}
    </View>
  )
}
