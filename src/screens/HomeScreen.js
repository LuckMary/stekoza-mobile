import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment } from '../store/counter'
import { clearMe } from '../store/me'

const HomeScreen = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{count}</Text>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'lightgreen', marginBottom: 10 }}
        onPress={() => dispatch(increment())}
      >
        <Text>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'lightgreen', marginBottom: 10 }}
        onPress={() => dispatch(decrement())}
      >
        <Text>Decrement</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'lightgreen' }}
        onPress={() => dispatch(clearMe())}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
