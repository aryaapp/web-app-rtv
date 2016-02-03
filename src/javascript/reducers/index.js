import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';

import user from './user'
import journals from './journals'
import homeView from './homeView'
import moodTracking from './moodTracking'
import errors from './errors'
import auth from './auth'

/*
  Improve error handling
  - react on create account with setting an error message
  - Integrate form validation and actions
*/

/*
  This lets each reducer handle the state that corresponse to his name.
  I.e. the 'feeling' reducer will replace the feeling: {} part of the state.
*/
const partialReducers = combineReducers({
  access_token: auth,
  errors: errors,
  form: formReducer,
  homeView: homeView,
  journals: journals,
  moodTracking: moodTracking,
  routing: routeReducer,
  user: user,
})

export default partialReducers