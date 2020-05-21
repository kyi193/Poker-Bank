import { ADD_SESSION } from '../actions'
let newState;
const sessions = (state = {}, action) => {
  switch (action.type) {
    case ADD_SESSION:
      newState = { ...state }
      newState[action.id] = action.sessionInfo
    default:
      return state
  }
}

export default sessions;
