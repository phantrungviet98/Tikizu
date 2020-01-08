import React from 'react'
import {View, StyleSheet} from 'react-native'
import {withNavigation} from 'react-navigation'
import {TakuzuLine} from '../Components/TakuzuLine'
import {Colors} from '../../../Assets/Colors'
import {Metrics} from '../../../Assets'
import ItemStateTypes from '../../../Common/Types/ItemStateTypes'
import _ from 'lodash'

class TakuzuTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.data = this.generateData()
  }

  checkLessThanThreeDigitsAdjacentRow = (data) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const current = data[i][j]
        const right = data[i][j + 1]
        const nextRight = data[i][j + 2]

        if (current === right && current === nextRight) {
          return false
        }
      }
    }

    return true
  }

  checkLessThanThreeDigitsAdjacent = () => {
    const transposeData = _.zip(...this.data)
    return (
      this.checkLessThanThreeDigitsAdjacentRow(this.data) &&
      this.checkLessThanThreeDigitsAdjacentRow(transposeData)
    )
  }

  checkNotSameBetweenRowsColumns = () => {
    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        if (_.isEqual(this.data[i], this.data[j])) {
          return false
        }
      }
    }

    return true
  }

  checkSumEqual = () => {
    let sum0Ver = 0
    let sum0Hor = 0

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.data[i][j] === ItemStateTypes.PICK_ZERO) {
          sum0Hor++
        }
        if (this.data[j][i] === ItemStateTypes.PICK_ZERO) {
          sum0Ver++
        }
      }
      if (sum0Hor !== 3 || sum0Ver !== 3) {
        return false
      } else {
        sum0Hor = 0
        sum0Ver = 0
      }
    }

    return true
  }

  checkNotNull = () => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.data[i][j] === ItemStateTypes.NOT_PICK) {
          return false
        }
      }
    }

    return true
  }

  /**
   * check data is valid the rule of game
   * @param checkNull (for initial data we should not check null
   * @returns {boolean}
   */
  checkValid = (checkNull) => {

    return (
      (checkNull ? this.checkNotNull() : true) &&
      this.checkSumEqual() &&
      this.checkLessThanThreeDigitsAdjacent() &&
      this.checkNotSameBetweenRowsColumns()
    )
  }

  getRandomStaticPosition = () => {
    const randomPosition = []
    const randomNumOfStatic = Math.floor(Math.random() * 5) + 2
    let iter = 0
    while (iter < randomNumOfStatic) {
      const iRandomPosition = Math.floor(Math.random() * 4)
      const jRandomPosition = Math.floor(Math.random() * 4)

      const index = _.findIndex(
        iRandomPosition,
        (val) => val.i === iRandomPosition && val.j === jRandomPosition,
      )
      if (index === -1) {
        randomPosition.push({
          i: iRandomPosition,
          j: jRandomPosition,
        })
      } else {
        continue
      }
      iter++
    }

    return randomPosition
  }

  generateData = () => {
    let data = new Array(6)

    for (let i = 0; i < 6; i++) {
      data[i] = new Array(6)
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        data[i][j] = ItemStateTypes.NOT_PICK
      }
    }
    return data
  }

  getArrayDataPerLine = (key) => {
    return this.data[key].map((val) => {
      return val
    })
  }

  onPress = (key, data) => {
    const {
      navigation,
      onWin,
    } = this.props

    for (let i = 0; i < 6; i++) {
      this.data[key][i] = data[i]
    }

    if (this.checkValid(true)) {
      onWin()
      navigation.navigate('Rank')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TakuzuLine data={this.getArrayDataPerLine(0)} onPress={(data) => this.onPress(0, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(1)} onPress={(data) => this.onPress(1, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(2)} onPress={(data) => this.onPress(2, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(3)} onPress={(data) => this.onPress(3, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(4)} onPress={(data) => this.onPress(4, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(5)} onPress={(data) => this.onPress(5, data)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.screenHeight / 10,
    alignSelf: 'center',
    width: '90%',
    height: (Metrics.screenWidth * 90) / 100,
    backgroundColor: Colors.gray_888888,
  },
})

export default withNavigation(TakuzuTable)
