import { LOGIN_FAILED, LOGIN_RECEIVED } from '../actions/login'
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
    default:
      return state
  }
}

