import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { LayoutList } from './layout-list'
import { PanGesture } from './pan-gesture'
import { Swipe } from './swipe'

export default function Page() {
  return (
    <View className='flex-1 gap-5'>
      <Link asChild href='/'>
        <Button>
          <Text>Return</Text>
        </Button>
      </Link>

      <Swipe />
      <LayoutList />
      <PanGesture />

      <View className='flex-1 gap-2'>
        <Link asChild href='/' className='mt-auto'>
          <Button>
            <Text>Return</Text>
          </Button>
        </Link>
      </View>
    </View>
  )
}
