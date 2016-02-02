import { RECEIVED_JOURNALS, JOURNAL_SAVED } from '../actions/journals'
import { LOGOUT } from '../actions/login'
import { journalSorter } from '../utilities'

export default function user(journals = [], action) {
  switch (action.type) {
    case RECEIVED_JOURNALS:
      return action.data.sort(journalSorter)
    case JOURNAL_SAVED:
      return [...journals, action.journal].sort(journalSorter)
    case LOGOUT:
      return []
    default:
      return journals
  }
}

