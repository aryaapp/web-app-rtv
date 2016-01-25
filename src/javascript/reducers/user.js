import { LOGIN_RECEIVED, LOGOUT, LOGIN_FAILED } from '../actions/login'
import { RECEIVED_CREATE_ACCOUNT } from '../actions/createAccount'

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_RECEIVED:
      return Object.assign({}, state, {
          access_token: action.data.access_token,
          user: action.data.user,
          errors: []
        })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
          errors: action.errors
        })
    case RECEIVED_CREATE_ACCOUNT:
      return Object.assign({}, state, { user: action.data.user })
    case LOGOUT:
      return Object.assign({}, state, { user: {}, access_token: '' })
    default:
      return state
  }
}

