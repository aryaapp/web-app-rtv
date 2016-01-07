import { combineReducers } from 'redux'
import feeling from './feeling'
import body from './body'
import thoughts from './thoughts'
import situation from './situation'
import reaction from './reaction'
import currentPage from './currentPage'

import { CLEAR_DATA } from '../actions/actions'


/*
  This lets each reducer handle the state that corresponse to his name.
  I.e. the 'feeling' reducer will replace the feeling: {} part of the state.
*/
const partialReducers = combineReducers({
  feeling,
  body,
  thoughts,
  situation,
  reaction,
  currentPage
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

const clearDataReducer = function(state, action) {
  switch (action.type) {
    case CLEAR_DATA:
      return partialReducers(undefined, action)
    default:
      return state
  }
}

const globalReducers = reduceReducers(partialReducers, clearDataReducer)

export default globalReducers