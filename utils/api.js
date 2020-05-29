import { AsyncStorage, Linking } from 'react-native'
import qs from 'qs'


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

export async function exportEmail(to, subject, body, options = {}) {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}
