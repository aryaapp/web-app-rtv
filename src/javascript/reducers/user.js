import { LOGIN_RECEIVED } from '../actions/login'

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_RECEIVED:
      return Object.assign({}, state, {
          access_token: action.data.access_token,
          user: action.data.user
        })
    default:
      return state
  }
}

