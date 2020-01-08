import React from 'react'
import {View, StyleSheet} from 'react-native'
import {TakuzuTableItem} from './TakuzuTableItem'

export class TakuzuLine extends React.PureComponent {
  constructor(props) {
    super(props)
    this.data = props.data
  }


  onPress = (key, data) => {
    const {onPress} = this.props

    this.data[key] = data
    onPress(this.data)
  }

  render() {
    const {data} = this.props

    return (
      <View style={styles.line}>
        <TakuzuTableItem data={data[0]} onPress={(itemState) => this.onPress(0, itemState)}/>
        <TakuzuTableItem data={data[1]} onPress={(itemState) => this.onPress(1, itemState)}/>
        <TakuzuTableItem data={data[2]} onPress={(itemState) => this.onPress(2, itemState)}/>
        <TakuzuTableItem data={data[3]} onPress={(itemState) => this.onPress(3, itemState)}/>
        <TakuzuTableItem data={data[4]} onPress={(itemState) => this.onPress(4, itemState)}/>
        <TakuzuTableItem data={data[5]} onPress={(itemState) => this.onPress(5, itemState)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    height: '16.66%'
  }
})
