import fetch from 'isomorphic-fetch'
import { getValues } from 'redux-form';


export const LOGIN_REQUEST = 'LOGIN_REQUEST'

export function requestLogin(email) {
  return {
    type: LOGIN_REQUEST,
    email: email,
  }
}

export const LOGIN_RECEIVED = 'LOGIN_RECEIVED'

export function receiveLogin(email, data) {
  console.log('receiveLogin triggered')
  return {
    type: LOGIN_RECEIVED,
    data: data
  }
}

export function executeLogin(email, password) {
  return dispatch => {
    dispatch(requestLogin(email))

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return fetch('https://arya-api-dev.herokuapp.com/v1/oauth/token',
        {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password}),
          headers: headers
        })
      .then( response => response.json() )
      .then( json => dispatch(receiveLogin(email, json)) )
      .catch( error => {
        console.log('catch block error', error)
      })
  }
}

