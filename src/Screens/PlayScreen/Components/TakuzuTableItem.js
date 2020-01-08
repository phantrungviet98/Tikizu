import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native'
import {Colors} from '../../../Assets'
import ItemStateTypes from '../../../Common/Types/ItemStateTypes'

export class TakuzuTableItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      itemState: props.data,
    }
    this.disabled = props.data !== ItemStateTypes.NOT_PICK
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.disabled = this.props.data !== ItemStateTypes.NOT_PICK
      this.setState({
        itemState: this.props.data
      })
    }
  }

  onPress = () => {
    const {itemState} = this.state
    const {onPress} = this.props

    this.setState({
      itemState:
        itemState === ItemStateTypes.NOT_PICK
          ? ItemStateTypes.PICK_ONE
          : (itemState === ItemStateTypes.PICK_ONE
          ? ItemStateTypes.PICK_ZERO
          : ItemStateTypes.NOT_PICK),
    }, () => onPress(this.state.itemState))
  }

  render() {
    const {itemState} = this.state

    return (
      <TouchableOpacity
        disabled={this.disabled}
        style={[
          styles.container,
          {
            backgroundColor:
              itemState === ItemStateTypes.NOT_PICK
                ? Colors.white_FFFFFF
                : itemState === ItemStateTypes.PICK_ONE
                ? Colors.green_42CA53
                : Colors.red_FD1814,
          },
        ]}
        onPress={this.onPress}
      >
        {this.disabled && <Text>Tĩnh</Text>}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white_FFFFFF,
    width: '16.66%',
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.gray_888888,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
