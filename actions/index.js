export const ADD_SESSION = 'ADD_SESSION';
export const RECEIVE_SESSIONS = 'RECEIVE_SESSIONS'
export const CLEAR_SESSIONS = 'CLEAR_SESSIONS'

export function addSession(id, sessionInfo) {
  return {
    type: ADD_SESSION,
    id,
    sessionInfo,
  }
}
export function receiveSessions(sessions) {
  return {
    type: RECEIVE_SESSIONS,
    sessions,
  }
}
export function clearSession(session) {
  return {
    type: CLEAR_SESSIONS,
    session
  }
}
