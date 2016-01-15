import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'

export const REQUEST_CREATE_ACCOUNT = 'REQUEST_CREATE_ACCOUNT'

export function requestCreateAccount(email) {
  return {
    type: requestCreateAccount,
    email: email,
  }
}

export const RECEIVED_CREATE_ACCOUNT = 'RECEIVED_CREATE_ACCOUNT'

export function receivedCreateAccount(email, data) {
  console.log('receivedCreateAccount triggered')
  return {
    type: RECEIVED_CREATE_ACCOUNT,
    data: data
  }
}

export function executeCreateAccount(email, password) {
  return dispatch => {
    dispatch(requestCreateAccount(email))

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return fetch('https://arya-api-dev.herokuapp.com/v1/users',{
        method: 'POST',
        body: JSON.stringify({ user: { email: email, password: password, client_id: 'ios-app'} }),
        headers: headers
      })
      .then( response => response.json() )
      .then( (json) => {
        dispatch(receivedCreateAccount(email, json))
      }).catch( error => {
        console.log('catch block error', error)
      })
  }
}

