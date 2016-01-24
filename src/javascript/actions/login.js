import fetch from 'isomorphic-fetch'
import { getValues } from 'redux-form';
import config from '../constants/config'
import { unscheduleJournalSave, executeSaveJournal } from './journals'
import { prepareJournalData } from '../utilities'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'

export function requestLogin(email) {
  return {
    type: LOGIN_REQUEST,
    email: email,
  }
}

export const LOGIN_RECEIVED = 'LOGIN_RECEIVED'

export function receiveLogin(email, data) {
  return {
    type: LOGIN_RECEIVED,
    data: data
  }
}

export function executeLogin(email, password) {
  return (dispatch, getState) => {
    dispatch(requestLogin(email))

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return fetch(config.aryaApiUrl + '/v1/oauth/token',
        {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password}),
          headers: headers
        })
      .then( response => response.json() )
      .then( json => {
        dispatch(receiveLogin(email, json))
         if(getState().moodTracking.scheduledJournalSave) {
          dispatch(unscheduleJournalSave())
          dispatch(executeSaveJournal(prepareJournalData(getState())))
        }
      })
      .catch( error => {
        console.log('catch block error', error)
      })
  }
}

export const LOGOUT = 'LOGOUT'

export function logout() {
  return {
    type: LOGOUT
  }
}