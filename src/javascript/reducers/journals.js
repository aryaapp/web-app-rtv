import { RECEIVED_JOURNALS, JOURNAL_SAVED } from '../actions/journals'
import { LOGOUT } from '../actions/login'

export default function user(journals = [], action) {
  switch (action.type) {
    case RECEIVED_JOURNALS:
      return action.data
    case JOURNAL_SAVED:
      return [ ...journals, action.journal]
    case LOGOUT:
      return []
    default:
      return journals
  }
}

