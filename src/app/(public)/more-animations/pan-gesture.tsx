import { Text } from '@/components/ui/text'
import { useCallback, useEffect, useRef, useState } from 'react'
import { type LayoutChangeEvent, PanResponder, Platform, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { clamp } from 'react-native-reanimated'

export const PanGesture = () => {
  const PADDING_LEFT = 0
  const SPACING_RIGHT = 105
  const SPACING_TOP = 55

  const containerRef = useRef<View>(null)

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    const widthWithPadding = width - 40
    const heightWithPadding = height - 200
    setContainerSize({ width: widthWithPadding, height: heightWithPadding })
  }, [])

  const measureContainer = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height) => {
        if (Platform.OS === 'web') {
          const widthWithPadding = width - 40
          const heightWithPadding = height - 200
          return setContainerSize({
            width: widthWithPadding,
            height: heightWithPadding,
          })
        }

        const heightWithPadding = height - 180
        return setContainerSize({ width, height: heightWithPadding })
      })
    }
  }, [])

  useEffect(() => {
    measureContainer()

    if (Platform.OS === 'web') {
      window.addEventListener('resize', measureContainer)

      return () => {
        window.removeEventListener('resize', measureContainer)
      }
    }
  }, [measureContainer])

  useEffect(() => {
    if (Platform.OS === 'web') {
      const initialXPos = containerSize.width / 2 - 50
      const initialYPos = -containerSize.height / 2 + 50

      setPosition({ x: initialXPos, y: initialYPos })
      return
    }

    const initialXPos = containerSize.width - SPACING_RIGHT
    const initialYPos = SPACING_TOP

    setPosition({ x: initialXPos, y: initialYPos })
  }, [containerSize])

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (e, gestureState) => {
      if (Platform.OS === 'web') {
        const maxTranslateX = containerSize.width / 2 - 50
        const maxTranslateY = containerSize.height / 2 - 50

        setPosition((prevPosition) => ({
          x: clamp(prevPosition.x + gestureState.dx, -maxTranslateX, maxTranslateX),
          y: clamp(prevPosition.y + gestureState.dy, -maxTranslateY, maxTranslateY),
        }))
        return
      }

      const maxTranslateX = containerSize.width - SPACING_RIGHT
      const maxTranslateY = containerSize.height - SPACING_TOP

      setPosition((prevPosition) => ({
        x: clamp(prevPosition.x + gestureState.dx, PADDING_LEFT, maxTranslateX),
        y: clamp(prevPosition.y + gestureState.dy, SPACING_TOP, maxTranslateY),
      }))
    },
    onPanResponderRelease: () => {},
  })

  return (
    <View
      ref={containerRef}
      onLayout={handleLayout}
      className='relative flex-1 w-full h-full web:max-w-3xl web:mx-auto'
    >
      <GestureHandlerRootView className='z-50 items-center justify-center flex-1'>
        <View
          {...panResponder.panHandlers}
          className='absolute w-[105px] h-[140px] bg-violet-500 rounded-md'
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <Text className='text-white'>👋</Text>
        </View>
      </GestureHandlerRootView>
    </View>
  )
}
