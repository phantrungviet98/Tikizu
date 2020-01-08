import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import normalize from 'react-native-normalize/src/index'
import {Colors} from '../../../Assets/Colors'

export class CounterTimer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      minutesCounter: '00',
      secondsCounter: '00',
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  start = () => {
    const {
      getTime
    } = this.props

    this.timer = setInterval(() => {
      const {secondsCounter, minutesCounter} = this.state

      let num = (Number(secondsCounter) + 1).toString()
      let count = minutesCounter

      if (Number(secondsCounter) === 59) {
        count = (Number(minutesCounter) + 1).toString()
        num = '00'
      }

      this.setState(
        {
          minutesCounter: count.length === 1 ? '0' + count : count,
          secondsCounter: num.length === 1 ? '0' + num : num,
        }, () => getTime(this.state.minutesCounter+':'+this.state.secondsCounter)
      )
    }, 1000)
  }

  render() {
    const {minutesCounter, secondsCounter} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.counterText}>
          {minutesCounter} : {secondsCounter}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white_FFFFFF,
  },
  counterText: {
    fontSize: normalize(50),
    color: Colors.black_3B3B3B,
  },
})
