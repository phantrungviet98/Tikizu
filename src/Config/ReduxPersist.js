import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import {AsyncStorage}  from 'react-native'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '0.4',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    blacklist: [],
    whitelist: ['score'],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
