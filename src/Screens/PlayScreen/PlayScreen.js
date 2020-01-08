import React from 'react'
import {View, StyleSheet, BackHandler, Alert} from 'react-native'
import {CounterTimer, TakuzuTable} from './Components'
import {TKBanner} from '../../Components'
import ScoreActions from '../../Redux/ScoreRedux'
import {connect} from 'react-redux'

class PlayScreen extends React.Component {
  constructor(props) {
    super(props)
    this.time = ''
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    Alert.alert(
      'Cảnh báo !!!',
      'Bạn có muốn thoát ván này không ?',
      [
        {
          text: 'Không',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Tất nhiên !!', onPress: () => this.props.navigation.goBack()},
      ],
      {cancelable: false},
    );

    return true
  }

  getTime = (time) => {
    this.time = time
  }

  onWin = () => {
    this.props.addScore(this.time)
  }

  render() {

    return (
      <View style={styles.container}>
        <CounterTimer getTime={this.getTime}/>
        <TakuzuTable onWin={this.onWin}/>
        <TKBanner/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    addScore: (score) => dispatch(ScoreActions.addScore(score))
  }
}

export default connect(null, mapDispatchToProps)(PlayScreen)
