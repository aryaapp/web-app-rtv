import { DISPLAY_NEXT_WEEK, DISPLAY_PREV_WEEK, SET_JOURNALS_FOR_PDF, DISPLAY_LAST_JOURNAL } from '../actions/homeView'
import { RECEIVED_JOURNALS } from '../actions/journals'
import { journalSorter } from '../utilities'
import _ from 'lodash'

const getMonday = function (original_date) {
  let date = new Date(original_date)
  let day = date.getDay()
  let diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  date.setDate(diff)
  date.setHours(0,0,0,0)
  return date
}

const getSunday = function(original_date) {
  let date = getMonday(new Date(original_date))
  date.setDate(date.getDate() + 6)
  date.setHours(23,59,59,999)
  return date
}

const buildState = function(date = new Date(), state) {
  let beginningOfWeek = getMonday(date)
  let endOfWeek = getSunday(date)
  let selectedJournals = []
  if(!_.isNil(state.journals)) {
    selectedJournals = state.journals.filter(journal => {
      let journal_date = new Date(journal.created_at.substring(0,10))
      return (journal_date > beginningOfWeek && journal_date < endOfWeek)
    })
  }

  return {
    beginningDate: beginningOfWeek,
    endDate: endOfWeek,
    selectedJournals: selectedJournals,
    journalsForPdf: typeof state.homeViewState === 'undefined' ? [] : (state.homeViewState.journalsForPdf || [])
  }
}

const lastJournalDate = function(journals) {
  if(!_.isNil(journals)) {
    return new Date(_.first(journals.sort(journalSorter)).created_at)
  }
  return new Date()
}

export default function homeView(state, action) {
  switch (action.type) {
    case DISPLAY_PREV_WEEK:
      return Object.assign({}, state, { homeView: buildState(state.homeView.beginningDate - 8, state) })
    case DISPLAY_NEXT_WEEK:
      let nextWeekDate = new Date(state.homeView.beginningDate)
      nextWeekDate.setDate(nextWeekDate.getDate() + 8)
      // Don't show dates in the future
      if(nextWeekDate > new Date()) {
        nextWeekDate = new Date()
      }
      return Object.assign({}, state, { homeView: buildState(nextWeekDate, state) })
    case DISPLAY_LAST_JOURNAL:
      return Object.assign({}, state, { homeView: buildState(lastJournalDate(state.journals), state) })
    case RECEIVED_JOURNALS:
      return Object.assign({}, state, { homeView: buildState(lastJournalDate(state.journals), state) })
    case SET_JOURNALS_FOR_PDF:
      let homeViewState = buildState(state.homeView.beginningDate, state)
      homeViewState.journalsForPdf = action.journal_ids
      return Object.assign({}, state, { homeView: homeViewState })
    default:
      if(_.isEmpty(state.homeView)) {
       return Object.assign({}, state, { homeView: buildState(new Date(), state) })
      }
      return state
  }
}
