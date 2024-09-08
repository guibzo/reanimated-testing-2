import { LucideInfo, LucideTrash } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

export const Swipe = () => {
  return (
    <View>
      <Swipeable
        renderLeftActions={() => {
          return (
            <Button className='items-center justify-center h-full p-5 bg-red-500 rounded-md native:h-full'>
              <LucideTrash className='text-white' size={18} />
            </Button>
          )
        }}
      >
        <Card className='items-center justify-center bg-zinc-600'>
          <CardContent className='p-4 pt-4'>
            <Text>Swipe me to right!</Text>
          </CardContent>
        </Card>
      </Swipeable>

      <Swipeable
        renderRightActions={() => {
          return (
            <Button className='items-center justify-center h-full p-5 rounded-md bg-amber-500 native:h-full'>
              <LucideInfo className='text-white' size={18} />
            </Button>
          )
        }}
        // rightThreshold={10}
      >
        <Card className='items-center justify-center bg-zinc-600'>
          <CardContent className='p-4 pt-4'>
            <Text>Swipe me to left!</Text>
          </CardContent>
        </Card>
      </Swipeable>
    </View>
  )
}
