export const ADD_SESSION = 'ADD_SESSION';

export function addSession(id, sessionInfo) {
  return {
    type: ADD_SESSION,
    id,
    sessionInfo,
  }
}
