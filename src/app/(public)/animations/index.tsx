import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { ColorButton } from './color-button'
import { FadeOnView } from './fade-on-view'
import { IncreaseableButtons } from './increaseable-buttons'
import { KeyframeCardEntering } from './keyframe-card-entering'
import { List } from './list'
import { ProgressBar } from './progress-bar'
import { Shake } from './shake'

export default function Page() {
  return (
    <ScrollView className='flex flex-1 gap-y-5'>
      <IncreaseableButtons />
      <ColorButton />
      <ProgressBar />
      <Shake />
      <FadeOnView />
      <List />
      <KeyframeCardEntering />

      <View className='flex-1'>
        <Link asChild href='/' className='mt-auto'>
          <Button>
            <Text>Return</Text>
          </Button>
        </Link>
      </View>
    </ScrollView>
  )
}
