import AsyncStorage from '@react-native-community/async-storage'

export class BaseStore {
  handleError(error) {
    console.log('error', error)
  }

  async setStorage(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }

  async getStorage(key) {
    try {
      const data = await AsyncStorage.getItem(key)
      return JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }
}
