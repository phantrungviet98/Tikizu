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
    console.log(data)
    return (
      <View style={styles.line}>
        {data.map((element, index) =>
          <TakuzuTableItem data={element} onPress={(itemState) => this.onPress(index, itemState)}/>
        )}
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
