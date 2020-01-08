import React from 'react'
import {View, StyleSheet} from 'react-native'
import {CounterTimer, TakuzuTable} from './Components'
import ScoreActions from '../../Redux/ScoreRedux'
import {connect} from 'react-redux'

class PlayScreen extends React.Component {
  constructor(props) {
    super(props)
    this.time = ''
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
