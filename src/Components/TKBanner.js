import {Text, View, StyleSheet} from 'react-native'
import React from 'react'
import {Colors} from '../Assets'
import normalize from 'react-native-normalize/src/index'

export const TKBanner = ({containerStyle, textStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.banner, textStyle]}>Tikizu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '40%',
    width: '100%',
    alignItems: 'center'
  },
  banner: {
    fontSize: normalize(100)
  }
})
