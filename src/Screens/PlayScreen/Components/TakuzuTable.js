import React from 'react'
import {View, StyleSheet} from 'react-native'
import {TakuzuLine} from '../Components/TakuzuLine'
import {Colors} from '../../../Assets/Colors'
import {Metrics} from '../../../Assets'
import ItemStateTypes from '../../../Common/Types/ItemStateTypes'
import _ from 'lodash'

export class TakuzuTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.data = this.generateData()
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
      }
      else {
        continue
      }
      iter++
    }

    return randomPosition
  }

  generateData = () => {


    let data = new Array(4)

    for (let i = 0; i < 4; i++) {
      data[i] = new Array(4)
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        console.log('i', i, 'j', j)
        if (_.findIndex((val) => (val.i === i && val.j === j)) === -1) {
          data[i][j] = (i + j) % 2 === 0 ? ItemStateTypes.PICK_ZERO : ItemStateTypes.PICK_ONE
        } else {
          data[i][j] = ItemStateTypes.NOT_PICK
        }
      }
    }
    return data
    // for (let i = 0; i < 4; i++) {
    //   for (let j = 0; j < 4; j++) {
    //     console.log(this.data[i][j] + " ");
    //   }
    // }
  }

  getArrayDataPerLine = (key) => {
    return this.data[key].map((val) => {
      return val
    })
  }

  onPress = (key, data) => {}

  render() {
    return (
      <View style={styles.container}>
        <TakuzuLine data={this.getArrayDataPerLine(0)} onPress={(data) => this.onPress(0, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(1)} onPress={(data) => this.onPress(1, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(2)} onPress={(data) => this.onPress(2, data)} />
        <TakuzuLine data={this.getArrayDataPerLine(3)} onPress={(data) => this.onPress(3, data)} />
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
