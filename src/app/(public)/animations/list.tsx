import { Button } from '@/components/ui/button'
import { AnimatedCard, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { useState } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

const dataMock = [
  {
    id: '1',
    title: 'Item 1',
  },
  {
    id: '2',
    title: 'Item 2',
  },
  {
    id: '3',
    title: 'Item 3',
  },
  {
    id: '4',
    title: 'Item 4',
  },

  {
    id: '5',
    title: 'Item 5',
  },
  {
    id: '6',
    title: 'Item 6',
  },
  {
    id: '7',
    title: 'Item 7',
  },
  {
    id: '8',
    title: 'Item 8',
  },
]

export const List = () => {
  const [data, setData] = useState(() => dataMock.slice(0, 4))

  const handleChangeListData = () => {
    if (data.includes(dataMock[0])) {
      const lastFourItems = dataMock.slice(4, 8)

      return setData(lastFourItems)
    }

    const firstFourItems = dataMock.slice(0, 4)
    setData(firstFourItems)
  }

  return (
    <View>
      <Button className='w-full mb-1' onPress={handleChangeListData}>
        <Text>Reload list</Text>
      </Button>

      <Animated.FlatList
        numColumns={2}
        nestedScrollEnabled
        keyExtractor={(item) => item.id}
        data={data}
        contentContainerClassName='gap-1.5 grow'
        columnWrapperClassName='gap-1.5'
        renderItem={({ item, index }) => (
          <AnimatedCard
            entering={FadeIn.delay(index * 100)}
            className='items-center justify-center flex-1 bg-emerald-500'
          >
            <CardContent className='p-4 pt-4'>
              <Text>{item.title}</Text>
            </CardContent>
          </AnimatedCard>
        )}
      />
    </View>
  )
}
