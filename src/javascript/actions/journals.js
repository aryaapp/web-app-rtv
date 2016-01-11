import fetch from 'isomorphic-fetch'

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

export function executeLoadJournals() {
  return (dispatch, getState) => {
    const { user, access_token } = getState()
    dispatch(requestJournals(user.id))

    let headers = new Headers({
      'Authorization': `Bearer ${ access_token }`,
      'Content-Type': 'application/json'
    });

    return fetch('https://arya-api-dev.herokuapp.com/v1/journals',
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
  console.log('executeSaveJournal journal_data', journal_data)
  return (dispatch, getState) => {
    dispatch(sendJournals(journal_data))
    const { access_token } = getState()

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ access_token }`,
     });

    return fetch('https://arya-api-dev.herokuapp.com/v1/journals', {
      method: 'POST',
      body: JSON.stringify({ journal: journal_data }),
      headers: headers
    })
    .then( response => response.json() )
    .then( json => {
      console.log('response json', json)
      dispatch(journalSaved(json))
    })
    .catch( error => {
      console.log('catch block error', error)
    })
  }
}
