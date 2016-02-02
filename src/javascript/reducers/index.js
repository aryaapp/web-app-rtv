import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';

import user from './user'
import journals from './journals'
import homeView from './homeView'
import moodTracking from './moodTracking'
import errors from './errors'
import auth from './auth'

/* Refactor State
  Thinks I don't like
  - Reducers changing different parts of the state
  -- Moodtracking - to distributed
  -- User - also changes access token
  - Errors reducer should exists and handle all error relate things
  - Reducers - with access to global state
  -- homeView - access journals

  Tods:
  - Moodtracking
  -- Merge Moodtracking Reducer - done
  - Errors
  -- Move all errors to a error reducer - done
  - User
  -- Have an access reducer to react to the same action - done
  - homeView
  -- Move the calculation of the journals to a select function in the view (http://rackt.org/redux/docs/recipes/ComputingDerivedData.html)

  Current Todo - Move all errors to a error reducer

*/

/*
  This lets each reducer handle the state that corresponse to his name.
  I.e. the 'feeling' reducer will replace the feeling: {} part of the state.
*/
const partialReducers = combineReducers({
  access_token: auth,
  errors: errors,
  form: formReducer,
  homeView: (state = {}) => state,
  journals: journals,
  moodTracking: moodTracking,
  routing: routeReducer,
  user: user,
})

/*
  The reduce reducer lets each reducer replace the hole state. This is not possible
  with the combineReducer function.
*/
const reduceReducers = function(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

const globalReducers = reduceReducers(partialReducers, homeView)

export default globalReducers