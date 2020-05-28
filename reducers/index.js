import { ADD_SESSION, RECEIVE_SESSIONS, CLEAR_SESSIONS } from '../actions'
let newState;
const sessions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SESSIONS:
      return {
        ...state,
        ...action.sessions
      }
    case ADD_SESSION:
      newState = { ...state }
      newState[action.id] = action.sessionInfo
      return newState;
    case CLEAR_SESSIONS:
      return {}
    default:
      return state
  }
}

export default sessions;
