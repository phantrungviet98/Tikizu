import React from 'react'
import {View, StyleSheet} from 'react-native'
import {TakuzuTableItem} from './TakuzuTableItem'
import ItemStateTypes from '../../../Common/Types/ItemStateTypes'

export class TakuzuLine extends React.PureComponent {
  constructor(props) {
    super(props)

  }


  onPress = (key, data) => {
    const {onPress} = this.props


  }

  render() {
    const {data} = this.props
    console.log('data', data)

    return (
      <View style={styles.line}>
        <TakuzuTableItem data={data[0]} onPress={(itemState) => this.onPress(0, itemState)}/>
        <TakuzuTableItem data={data[1]} onPress={(itemState) => this.onPress(1, itemState)}/>
        <TakuzuTableItem data={data[2]} onPress={(itemState) => this.onPress(2, itemState)}/>
        <TakuzuTableItem data={data[2]} onPress={(itemState) => this.onPress(3, itemState)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    height: '25%'
  }
})
