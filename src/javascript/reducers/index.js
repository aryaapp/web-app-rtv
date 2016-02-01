import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';

import feeling from './feeling'
import body from './body'
import thoughts from './thoughts'
import situation from './situation'
import reaction from './reaction'
import userReducer from './user'
import journalReducer from './journals'
import homeViewReducer from './homeView'
import moodTrackingReducer from './moodTracking'

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
  -- Move all errors to a error reducer
  - User
  -- Have an access reducer to react to the same action
  - homeView
  -- Move the calculation of the journals to a select function in the view (http://rackt.org/redux/docs/recipes/ComputingDerivedData.html)

  Current Todo - Move all errors to a error reducer


*/

/*
  This lets each reducer handle the state that corresponse to his name.
  I.e. the 'feeling' reducer will replace the feeling: {} part of the state.
*/
const partialReducers = combineReducers({
  access_token: (state = '') => state,
  errors: (state = []) => state,
  form: formReducer,
  homeView: (state = {}) => state,
  journals: journalReducer,
  moodTracking: moodTrackingReducer,
  routing: routeReducer,
  user: (state = {}) => state,
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

const globalReducers = reduceReducers(partialReducers, userReducer, homeViewReducer)

export default globalReducers