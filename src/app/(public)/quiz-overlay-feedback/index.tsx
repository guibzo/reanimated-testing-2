import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Audio } from 'expo-av'
import { notificationAsync, NotificationFeedbackType } from 'expo-haptics'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'
import { BlurSquares } from './blur-squares'
import { QuizOverlayFeedback } from './quiz-overlay-feedback'

type Answer = 'correct' | 'incorrect' | 'idle'

export default function Page() {
  const [answer, setAnswer] = useState<Answer>('idle')

  const playAnswerSound = async (answer: Omit<Answer, 'idle'>) => {
    const audioFile =
      answer === 'correct' ? require('@/assets/correct.mp3') : require('@/assets/wrong.mp3')

    const { sound } = await Audio.Sound.createAsync(audioFile, {
      shouldPlay: true,
      volume: 1,
    })

    await sound.setPositionAsync(0)
    await sound.playAsync()
  }

  const handleSelectAnswer = async () => {
    const randomAnswer = Math.floor(Math.random() * 2)

    if (randomAnswer === 0) {
      setAnswer('correct')

      await playAnswerSound('correct')
      await notificationAsync(NotificationFeedbackType.Success) // vibration
      return
    }

    if (randomAnswer === 1) {
      setAnswer('incorrect')

      await notificationAsync(NotificationFeedbackType.Error)
      await playAnswerSound('incorrect')
      return
    }
  }

  return (
    <View className='flex-1 gap-5'>
      <BlurSquares />
      <QuizOverlayFeedback answer={answer} />

      <View className='flex-1 gap-2.5'>
        <Button onPress={handleSelectAnswer} className='mt-auto'>
          <Text>Select answer</Text>
        </Button>

        <Link asChild href='/'>
          <Button>
            <Text>Return</Text>
          </Button>
        </Link>
      </View>
    </View>
  )
}
