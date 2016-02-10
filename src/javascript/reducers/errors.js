import {
  LOGIN_FAILED,
  LOGIN_RECEIVED,
  PASSWORD_RESET_REQUEST_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_SET_ERROR,
  PASSWORD_SET
} from '../actions/login'
import { CREATE_ACCOUNT_FAILED, RECEIVED_CREATE_ACCOUNT } from '../actions/createAccount'
import { assign, each, first, keys } from 'lodash'

export default function errors(state = {}, action) {
  switch (action.type) {
    case LOGIN_FAILED:
      return assign({}, state, { login: action.errors })
    case LOGIN_RECEIVED:
      return assign({}, state, { login: [] })
    case CREATE_ACCOUNT_FAILED:
      let errors = {}
      each(action.errors, (error_object) => {
        let key = first(keys(error_object))
        errors[key] = error_object[key]
      })
      return assign({}, state, { createAccount: errors })
    case RECEIVED_CREATE_ACCOUNT:
      return assign({}, state, { createAccount: [] })
    case PASSWORD_RESET_REQUEST_ERROR:
      return assign({}, state, { password_request: action.errors })
    case PASSWORD_RESET_REQUEST:
      return assign({}, state, { password_request: [] })
    case PASSWORD_SET_ERROR:
      return assign({}, state, { password_set: action.errors })
    case PASSWORD_SET:
      return assign({}, state, { password_set: [] })
    default:
      return state
  }
}

