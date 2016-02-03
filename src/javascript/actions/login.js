import fetch from 'isomorphic-fetch'
import { getValues } from 'redux-form';
import config from '../constants/config'
import { unscheduleJournalSave, executeSaveJournal } from './journals'
import { prepareJournalData } from '../utilities'
import { clearDataAction } from './actions'
import { routeActions } from 'react-router-redux'

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

export const LOGIN_FAILED = 'LOGIN_FAILED'

export function loginFailed(errors) {
  return {
    type: LOGIN_FAILED,
    errors: errors
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
      .then( response => {
        const s = response.status
        switch(true) {
          case (s >= 200 && s < 300):
            response.json().then( json => {
              dispatch(receiveLogin(email, json))
               if(getState().moodTracking.scheduledJournalSave) {
                dispatch(unscheduleJournalSave())
                dispatch(executeSaveJournal(prepareJournalData(getState())))
                dispatch(routeActions.push('/thank-you'))
              } else {
                dispatch(routeActions.push('/home'))
              }
            })
            break;
          case (s >= 400 && s < 500):
            response.json().then( json => dispatch(loginFailed(json.errors)))
            break;
          default:
            let error = new Error(response.statusText)
            error.reponse = reponse
            throw new error
        }
      })
  }
}

export const LOGOUT = 'LOGOUT'

export function logout() {
  return {
    type: LOGOUT
  }
}

export function clearAndLogout() {
  return (dispatch) => {
    dispatch(clearDataAction())
    dispatch(logout())
  }
}