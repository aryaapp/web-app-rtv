import { DISPLAY_JOURNAL_FOR_WEEK, DISPLAY_NEXT_WEEK, DISPLAY_PREV_WEEK, SET_JOURNALS_FOR_PDF } from '../actions/homeView'
import { RECEIVED_JOURNALS } from '../actions/journals'
import { LOGOUT } from '../actions/login'
import { REHYDRATE, REHYDRATE_COMPLETE } from 'redux-persist/constants'

import { journalSorter, getSunday, getMonday, lastJournalDate } from '../utilities'
import { assign } from 'lodash'

const beginningDate = function(date = new Date()) {
  return {
    beginningDate: getMonday(date),
  }
}

const initialState = {
  beginningDate: getMonday(new Date()),
  journalsForPdf: []
}

export default function homeView(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_PREV_WEEK:
      return assign({}, state, beginningDate(state.beginningDate - 8))
    case DISPLAY_NEXT_WEEK:
      let nextWeekDate = new Date(state.beginningDate)
      nextWeekDate.setDate(nextWeekDate.getDate() + 8)

      // Don't show dates in the future
      if(nextWeekDate > new Date()) nextWeekDate = new Date()

      return assign({}, state, beginningDate(nextWeekDate - 8))
    case DISPLAY_JOURNAL_FOR_WEEK:
      return assign({}, state, beginningDate(action.date))
    case RECEIVED_JOURNALS:
      return assign({}, state, beginningDate(lastJournalDate(action.data)))
    case SET_JOURNALS_FOR_PDF:
      return assign({}, state, { journalsForPdf: action.journal_ids })
    case REHYDRATE:
      if(action.key === 'homeView') {
        return initialState
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
