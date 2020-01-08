import { combineReducers, createStore } from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  score: require('./ScoreRedux').reducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return {store, persistor}
}

