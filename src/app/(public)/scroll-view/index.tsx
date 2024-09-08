import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

export default function Page() {
  const scrollY = useSharedValue(0)

  const handleScrollY = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const fixedNavBarStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#38383883',
      paddingTop: 16,
      paddingBottom: 16,
      width: '100%',
      opacity: interpolate(scrollY.value, [50, 90], [0, 1], Extrapolation.CLAMP), // from scroll 50 to 90, start to level up opacity until 90+, where it reaches 1
      transform: [
        { translateY: interpolate(scrollY.value, [50, 100], [-40, 0], Extrapolation.CLAMP) }, // transition into screen smoothly from -40 to 0
      ],
    }
  })

  return (
    <View className='flex-1 h-[1500px] bg-green-600'>
      <Animated.View style={fixedNavBarStyles}>
        <View className='flex-row items-center justify-center flex-1 gap-2'>
          <View className='items-center justify-center rounded-full bg-primary size-10'>
            <Text className='text-white'>1</Text>
          </View>

          <View className='items-center justify-center rounded-full bg-primary size-10'>
            <Text className='text-white'>2</Text>
          </View>

          <View className='items-center justify-center rounded-full bg-primary size-10'>
            <Text className='text-white'>3</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView onScroll={handleScrollY}>
        <Text className='h-[1000px] text-3xl text-center py-5 text-white'>Scroll down!</Text>
      </Animated.ScrollView>

      <View className='flex-1 m-4'>
        <Link asChild href='/' className='mt-auto'>
          <Button>
            <Text>Return</Text>
          </Button>
        </Link>
      </View>
    </View>
  )
}
