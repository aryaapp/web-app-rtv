import { SCHEDULE_JOURNAL_SAVE, UNSCHEDULE_JOURNAL_SAVE } from '../actions/journals'
import _ from 'lodash'

export default function homeView(state = { scheduledJournalSave: false }, action) {
  switch (action.type) {
    case SCHEDULE_JOURNAL_SAVE:
      return { scheduledJournalSave: true }
    case UNSCHEDULE_JOURNAL_SAVE:
      return { scheduledJournalSave: false }
    default:
      return state
  }
}
