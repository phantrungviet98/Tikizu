import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {Colors} from '../Assets'
import normalize from 'react-native-normalize'

export const TKButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: normalize(25),
    backgroundColor: 'red',
    borderRadius: normalize(20)
  },
  text: {
    color: Colors.white_FFFFFF,
    fontSize: normalize(30),
    alignSelf: 'center'
  }
})
