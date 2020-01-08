/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import AppContainer from './Navigation/AppNavigation'
import {Provider} from 'react-redux'
import createStore from '../src/Redux'

export const {store} = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App
