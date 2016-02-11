import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'
import config from '../constants/config'
import { executeLogin } from './login'
import { executeSaveJournal, unscheduleJournalSave } from './journals'

export const REQUEST_CREATE_ACCOUNT = 'REQUEST_CREATE_ACCOUNT'
export function requestCreateAccount(email) {
  return {
    type: requestCreateAccount,
    email: email,
  }
}

export const RECEIVED_CREATE_ACCOUNT = 'RECEIVED_CREATE_ACCOUNT'
export function receivedCreateAccount(email, data) {
  return {
    type: RECEIVED_CREATE_ACCOUNT,
    data: data
  }
}

export const CREATE_ACCOUNT_FAILED = 'CREATE_ACCOUNT_FAILED'
export function createAccountFailed(errors) {
  return {
    type: CREATE_ACCOUNT_FAILED,
    errors: errors
  }
}

export function executeCreateAccount(email, password) {
  return (dispatch, getState) => {
    dispatch(requestCreateAccount(email))

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const returnUrl = window.location.protocol + '//' + window.location.host + '/email'
    return fetch(config.aryaApiUrl + '/v1/users', {
        method: 'POST',
        body: JSON.stringify(
          {
            user: { email: email, password: password, client_id: 'ios-app'},
            return_url: returnUrl
          }),
        headers: headers
      })
      .then( response => {
        const s = response.status
        switch(true) {
          case (s >= 200 && s < 300):
            response.json().then( json => {
              dispatch(receivedCreateAccount(email, json))
              dispatch(executeLogin(email, password))
            })
            break;
          case (s >= 400 && s <= 510):
            response.json().then( json => {
              dispatch(createAccountFailed(json.field_errors))
            })
            break;
          default:
            let error = new Error(response.statusText)
            error.response = response
            throw new error
        }
      })
  }
}

