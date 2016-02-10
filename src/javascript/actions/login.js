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

    const headers = new Headers({ 'Content-Type': 'application/json' });
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
                dispatch(executeSaveJournal(prepareJournalData(getState().moodTracking)))
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

export function executePasswordRequest(email) {
  return (dispatch, getState) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let returnUrl = window.location.protocol + '//' + window.location.host + '/passwort'

    return fetch(config.aryaApiUrl + '/v1/users/password_request', {
        method: 'POST',
        body: JSON.stringify({ email: email, return_url: returnUrl }),
        headers: headers
      })
      .then( response => {
        const s = response.status
        switch(true) {
          case (s >= 200 && s < 300):
            response.json().then( json => {
              dispatch(passwordResetRequest())
            })
            break
          case (s >= 400 && s < 500):
            response.json().then( json => {
              dispatch(passwordResetRequestError(json.errors))
            })
            break
          default:
            let error = new Error(response.statusText)
            error.response = response
            throw new error
        }
      })
  }
}

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST'
export function passwordResetRequest() {
  return {
    type: PASSWORD_RESET_REQUEST
  }
}

export const PASSWORD_RESET_REQUEST_ERROR = 'PASSWORD_RESET_REQUEST_ERROR'
export function passwordResetRequestError(errors) {
  return {
    type: PASSWORD_RESET_REQUEST_ERROR,
    errors: errors
  }
}

export function executePasswordSet(passwordToken, password) {
  return (dispatch, getState) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return fetch(config.aryaApiUrl + '/v1/users/password_set',
      {
        method: 'POST',
        body: JSON.stringify({ password_token: passwordToken, password: password }),
        headers: headers
      })
      .then( response => {
        const s = response.status
        switch(true) {
          case (s >= 200 && s < 300):
            response.json().then( json => {
              dispatch(passwordSet())
            })
            break
          case (s >= 400 && s < 500):
            response.json().then( json => {
              dispatch(passwordSetError(json.errors))
            })
            break
          default:
            let error = new Error(response.statusText)
            error.response = response
            throw new error
        }
      })
  }
}

export const PASSWORD_SET = 'PASSWORD_SET'
export function passwordSet() {
  return {
    type: PASSWORD_SET
  }
}

export const PASSWORD_SET_ERROR = 'PASSWORD_SET_ERROR'
export function passwordSetError(errors) {
  return {
    type: PASSWORD_SET_ERROR,
    errors: errors
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