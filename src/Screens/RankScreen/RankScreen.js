import React from 'react'
import {View, StyleSheet, BackHandler, FlatList, SafeAreaView, Text, Alert} from 'react-native'
import {connect} from 'react-redux'
import {RankItem} from './Components'
import {Colors} from '../../Assets'
import normalize from 'react-native-normalize/src/index'
import {TKButton} from '../../Components'

class RankScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    const {
      navigation,
    } = this.props
    const fromScreen = navigation.getParam('fromScreen')

    if (fromScreen === 'Play') {
      Alert.alert(
        'Thông báo !!!',
        'Chơi lại ?',
        [
          {
            text: 'Không',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'Tất nhiên !!', onPress: () => navigation.goBack()},
        ],
        {cancelable: false},
      );
    } else {
      navigation.goBack()
    }

    return true
  }

  playAgain = () => {
    const {navigation} = this.props
    const initialData = navigation.getParam('initialData')

    initialData()
    navigation.goBack()
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.textHeader}>BẢNG XẾP HẠNG THỜI GIAN HOÀN THÀNH TỐT NHẤT</Text>
      </View>
    )
  }

  render() {
    const {
      navigation,
      scoreState: {scoreData},
    } = this.props
    const fromScreen = navigation.getParam('fromScreen')
    const topFiveScore = scoreData.slice(0, 5)

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.wrapList}>
          <FlatList
            ListHeaderComponent={this.renderHeader()}
            data={topFiveScore}
            renderItem={({item, index}) => <RankItem time={item} index={index} />}
            keyExtractor={(index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.divide} />}
          />
        </View>
        {fromScreen === 'Play' && (
          <TKButton style={styles.button} onPress={this.playAgain} title={'Chơi lại'} />
        )}
        <TKButton
          style={styles.button}
          onPress={() => navigation.navigate('Selection')}
          title={'Quay lại màn hình chính'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green_42CA53,
    justifyContent: 'center',
  },
  wrapList: {
    height: '60%',
    marginHorizontal: normalize(10),
    backgroundColor: Colors.gray_7E7E7F,
  },
  button: {
    marginTop: normalize(20),
    marginHorizontal: normalize(10),
  },
  header: {
    width: '100%',
    height: normalize(80),
    backgroundColor: 'lightblue',
    marginBottom: normalize(12),
  },
  textHeader: {
    fontSize: normalize(22),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  divide: {
    height: 1,
    backgroundColor: Colors.black_3B3B3B,
  },
})

const mapStateToProps = (state) => {
  return {
    scoreState: state.score,
  }
}

export default connect(mapStateToProps)(RankScreen)
