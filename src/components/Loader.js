import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../constants/theme'

const Loader = () => {
  return (
    <LinearGradient colors={['black', Colors.pDark]} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -20
        }}
      >
        <ActivityIndicator size="large" color={Colors.secondary} />
      </View>
    </LinearGradient>
  )
}

export default Loader
