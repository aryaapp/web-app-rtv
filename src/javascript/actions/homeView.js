import fetch from 'isomorphic-fetch'

export const DISPLAY_NEXT_WEEK = 'DISPLAY_NEXT_WEEK'
export function nextWeek() {
  return {
    type: DISPLAY_NEXT_WEEK
  }
}

export const DISPLAY_PREV_WEEK = 'DISPLAY_PREV_WEEK'

export function prevWeek() {
  return {
    type: DISPLAY_PREV_WEEK
  }
}

export const SET_JOURNALS_FOR_PDF = 'SET_JOURNALS_FOR_PDF'

export function setJournalsForPdf(journal_ids) {
  return {
    type: SET_JOURNALS_FOR_PDF,
    journal_ids: journal_ids
  }
}