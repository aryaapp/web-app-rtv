import fetch from 'isomorphic-fetch'
import { clearDataAction } from './actions'
import { pushPath } from 'redux-simple-router'
import config from '../constants/config'

export const LOAD_JOURNALS = 'LOAD_JOURNALS'

export function requestJournals(user_id) {
  return {
    type: LOAD_JOURNALS,
    user_id: user_id,
  }
}

export const RECEIVED_JOURNALS = 'RECEIVED_JOURNALS'

export function receivedJournals(user_id, data) {
  return {
    type: RECEIVED_JOURNALS,
    user_id: user_id,
    data: data.journals
  }
}
export const SCHEDULE_JOURNAL_SAVE = 'SCHEDULE_JOURNAL_SAVE'

export function scheduleJournalSave() {
  return {
    type: SCHEDULE_JOURNAL_SAVE
  }
}

export function executeLoadJournals() {
  return (dispatch, getState) => {
    const { user, access_token } = getState()
    dispatch(requestJournals(user.id))

    let headers = new Headers({
      'Authorization': `Bearer ${ access_token }`,
      'Content-Type': 'application/json'
    });

    return fetch(config.aryaApiUrl + '/v1/journals',
        {
          method: 'GET',
          headers: headers
        })
      .then( response => response.json() )
      .then( json => dispatch(receivedJournals(user.id, json)) )
      .catch( error => {
        console.log('catch block error', error)
      })
  }
}

export const SEND_JOURNAL = 'SEND_JOURNAL'

export function sendJournals(journal) {
  return {
    type: SEND_JOURNAL,
    journal: journal,
  }
}

export const JOURNAL_SAVED = 'JOURNAL_SAVED'

export function journalSaved(data) {
  return {
    type: JOURNAL_SAVED,
    journal: data.journal
  }
}

export function executeSaveJournal(journal_data) {
  return (dispatch, getState) => {
    dispatch(sendJournals(journal_data))
    const { access_token } = getState()

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ access_token }`,
     });

    return fetch(config.aryaApiUrl + '/v1/journals', {
      method: 'POST',
      body: JSON.stringify({ journal: journal_data }),
      headers: headers
    })
    .then( response => response.json() )
    .then( json => {
      dispatch(journalSaved(json))
      dispatch(clearDataAction())
      dispatch(pushPath('/thank-you'))
    })
    .catch( error => {
      console.log('catch block error', error)
    })
  }
}
