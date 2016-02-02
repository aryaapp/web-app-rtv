import { createSelector } from 'reselect'
import { getSunday, getMonday, journalSorter, lastJournalDate } from '../utilities'
import { isNil, first } from 'lodash'

const selectJournals = function(beginningOfWeek, journals) {
  let endOfWeek = getSunday(beginningOfWeek)
  let selectedJournals = []
  if(!isNil(journals)) {
    selectedJournals = journals.filter(journal => {
      if(isNil(journal)) return false
      let journal_date = new Date(journal.created_at.substring(0,10))
      return (journal_date > beginningOfWeek && journal_date < endOfWeek)
    })
  }
  return selectedJournals.sort(journalSorter)
}

const beginningDateSelector = (state) => state.homeView.beginningDate
const journalsSelector      = (state) => state.journals

const selector = createSelector(
  [beginningDateSelector, journalsSelector],
  (beginningDate, journals) => selectJournals(beginningDate, journals)
)

export default selector