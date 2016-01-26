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

export function executeCreateAccount(email, password) {
  return (dispatch, getState) => {
    dispatch(requestCreateAccount(email))

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return fetch(config.aryaApiUrl + '/v1/users',{
        method: 'POST',
        body: JSON.stringify({ user: { email: email, password: password, client_id: 'ios-app'} }),
        headers: headers
      })
      .then( response => response.json() )
      .then( (json) => {
        dispatch(receivedCreateAccount(email, json))
        dispatch(executeLogin(email, password))
      }).catch( error => {
        console.log('catch block error', error)
      })
  }
}

