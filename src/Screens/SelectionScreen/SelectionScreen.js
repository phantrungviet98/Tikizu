import React from 'react'
import {View, StyleSheet} from 'react-native'
import {SelectionButton} from './Components'
import {Colors} from '../../Assets/Colors'
import normalize from 'react-native-normalize/src/index'

class SelectionScreen extends React.Component {
  render() {
    const {navigation} = this.props

    return (
      <View style={styles.container}>
        <SelectionButton
          style={styles.buttonStart}
          title={'Bắt đầu chơi'}
          onPress={() => navigation.navigate('Play')}
        />
        <SelectionButton
          style={styles.buttonStart}
          title={'Xem bảng xếp hạng'}
          onPress={() => navigation.navigate('Rank')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green_42CA53,
  },
  buttonStart: {
    marginBottom: normalize(20),
  },
})

export default SelectionScreen
