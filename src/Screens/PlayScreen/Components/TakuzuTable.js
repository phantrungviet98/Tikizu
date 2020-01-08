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

  checkLessThanThreeDigitsAdjacent = (data) => {
    const transposeData = _.zip(...data)
    return (
      this.checkLessThanThreeDigitsAdjacentRow(data) &&
      this.checkLessThanThreeDigitsAdjacentRow(transposeData)
    )
  }

  checkNotSameBetweenRowsColumns = (data) => {
    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        if (_.isEqual(data[i], data[j])) {
          return false
        }
      }
    }

    return true
  }

  checkSumEqual = (data) => {
    let sum0Ver = 0
    let sum0Hor = 0

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (data[i][j] === ItemStateTypes.PICK_ZERO) {
          sum0Hor++
        }
        if (data[j][i] === ItemStateTypes.PICK_ZERO) {
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

  checkNotNull = (data) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (data[i][j] === ItemStateTypes.NOT_PICK) {
          return false
        }
      }
    }

    return true
  }

  /**
   * check data is valid the rule of game
   * @param checkNull (for initial data we should not check null
   * @param data
   * @returns {boolean}
   */
  checkValid = (checkNull, data) => {
    return (
      checkNull &&
      this.checkNotNull(data) &&
      this.checkSumEqual(data) &&
      this.checkLessThanThreeDigitsAdjacent(data) &&
      this.checkNotSameBetweenRowsColumns(data)
    )
  }

  /**
   * Random from min to max
   * @param min
   * @param max
   * @returns Random value
   */
  tikiRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Get random position for initiation data
   * @returns {[]}
   */
  getRandomStaticPosition = () => {
    const randomPositions = []
    let numberRandom = this.tikiRandom(2, 4)

    while (numberRandom > 0) {
      const randomPosition = {
        i: this.tikiRandom(0, 5),
        j: this.tikiRandom(0, 5),
      }

      if (
        _.findIndex(
          randomPositions,
          (position) => position.i === randomPosition.i && position.j === randomPosition.j,
        ) === -1
      ) {
        randomPositions.push(randomPosition)
        numberRandom--
      }
    }

    return randomPositions
  }

  checkTrueInitial = (data) => {
    const transposeData = _.zip(...data)
    return this.checkTrueInitialRow(data) && this.checkTrueInitialRow(transposeData)
  }

  /**
   * Check initial data valid by row
   * @param data
   * @returns {boolean}
   */
  checkTrueInitialRow = (data) => {
    let reverseArray = [...data]
    reverseArray = reverseArray.reverse()

    for (let i = 0; i < 5; i++) {
      if (data[i][0] === data[i][1] && data[i][0] === data[i][5]) {
        return false
      }
      if (reverseArray[i][0] === reverseArray[i][1] && reverseArray[i][0] === reverseArray[i][5]) {
        return false
      }
    }
    return true
  }

  /**
   * Generate initial data
   * @returns {any[]}
   */
  generateData = () => {
    let data = new Array(6)

    do {
      for (let i = 0; i < 6; i++) {
        data[i] = new Array(6)
      }

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          data[i][j] = ItemStateTypes.NOT_PICK
        }
      }

      this.getRandomStaticPosition().forEach((position) => {
        data[position.i][position.j] = this.tikiRandom(0, 1)
      })
    } while (!this.checkValid(false, data) && this.checkTrueInitial(data))

    return data
  }

  getArrayDataPerLine = (key) => {
    return this.data[key].map((val) => {
      return val
    })
  }

  onPress = (key, data) => {
    const {navigation, onWin} = this.props

    for (let i = 0; i < 6; i++) {
      this.data[key][i] = data[i]
    }

    if (this.checkValid(true, this.data)) {
      onWin()
      navigation.navigate('Rank', {
        fromScreen: 'Play',
        initialData: () => {
          this.data = this.generateData()
          this.forceUpdate()
        },
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {[0, 1, 2, 3, 4, 5].map((element) => (
          <TakuzuLine
            data={this.getArrayDataPerLine(element)}
            onPress={(data) => this.onPress(element, data)}
          />
        ))}
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
