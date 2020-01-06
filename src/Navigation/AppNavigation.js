import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import SelectionScreen from '../Screens/SelectionScreen/SelectionScreen'
import PlayScreen from '../Screens/PlayScreen/PlayScreen'
import RankScreen from '../Screens/RankScreen/RankScreen'

const PublicNavigator = createStackNavigator(
  {
    Selection: {screen: SelectionScreen},
    Play: {screen: PlayScreen},
    Rank: {screen: RankScreen},
  },
  {
    initialRouteName: 'Selection',
    headerMode: 'none',
  },
)

const AppNavigator = createStackNavigator(
  {
    PublicNavigator: PublicNavigator,
  },
  {
    headerMode: 'none',
  },
)

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
