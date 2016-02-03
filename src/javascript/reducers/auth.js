import { LOGIN_RECEIVED, LOGOUT, LOGIN_FAILED } from '../actions/login'

export default function auth(state = '', action) {
  switch (action.type) {
    case LOGIN_RECEIVED:
      return action.data.access_token
    case LOGOUT:
      return ''
    default:
      return state
  }
}
