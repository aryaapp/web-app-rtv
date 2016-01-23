import { SCHEDULE_JOURNAL_SAVE, SEND_JOURNAL } from '../actions/journals'
import _ from 'lodash'


export default function homeView(state = { scheduledJournalSave: false }, action) {
  switch (action.type) {
    case SCHEDULE_JOURNAL_SAVE:
      return { scheduledJournalSave: true }
    case SEND_JOURNAL:
      return { scheduledJournalSave: false }
    default:
      return state
  }
}
