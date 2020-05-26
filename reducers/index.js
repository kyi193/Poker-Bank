import { ADD_SESSION } from '../actions'
let newState;
const sessions = (state = {}, action) => {
  switch (action.type) {
    case ADD_SESSION:
      newState = { ...state }
      action.sessionInfo['session'] = Object.keys(state).length + 1
      newState[action.id] = action.sessionInfo
      return newState;
    default:
      return state
  }
}

export default sessions;
