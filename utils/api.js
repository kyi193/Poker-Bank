import { AsyncStorage } from 'react-native'


export const SESSION_STORAGE_KEY = 'PokerBank:Sessions';

export const clearSessions = () => {
  AsyncStorage.clear()
}
export const retrieveSessions = () => {
  return AsyncStorage.getItem(SESSION_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results)
      return data
    })
}

export const saveSession = (sessionID, sessionInfo) => {
  return AsyncStorage.mergeItem(SESSION_STORAGE_KEY, JSON.stringify({
    [sessionID]: sessionInfo
  }))
}
