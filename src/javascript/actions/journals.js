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

