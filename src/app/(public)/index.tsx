import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Page() {
  return (
    <View className='flex-col justify-center flex-1 gap-2.5'>
      <Link asChild href='/skia'>
        <Button className='w-full'>
          <Text>See Skia</Text>
        </Button>
      </Link>
    </View>
  )
}
