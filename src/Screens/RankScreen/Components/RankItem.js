import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import normalize from 'react-native-normalize/src/index'
import {Colors} from '../../../Assets'

export class RankItem extends React.PureComponent {
  render() {
    const {time, index} = this.props

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: index % 2 === 0 ? Colors.white_FFFFFF : Colors.gray_CCCFD0},
        ]}
      >
        <View style={styles.wrapIndex}>
          <Text style={styles.index}>{index + 1}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: normalize(70),
    width: '98%',
    alignItems: 'center',
    backgroundColor: Colors.gray_CCCFD0,
    borderRadius: normalize(6),
    paddingLeft: normalize(30),
  },
  wrapIndex: {
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
    backgroundColor: 'lightblue',
    marginRight: '25%',
  },
  time: {
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: normalize(30)
  },
  index: {
    fontWeight: 'bold',
    fontSize: normalize(30)
  }
})
