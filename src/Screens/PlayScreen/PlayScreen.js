import React from 'react'
import {View, StyleSheet} from 'react-native'
import {CounterTimer, TakuzuTable} from './Components'

class PlayScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new Array(4),
      time: ''
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <CounterTimer/>
        <TakuzuTable/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PlayScreen
