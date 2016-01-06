import { combineReducers } from 'redux'
import feeling from './feeling'
import body from './body'
import thoughts from './thoughts'
import situation from './situation'
import reaction from './reaction'
import current_page from './current_page'

const rootReducer = combineReducers({
  feeling,
  body,
  thoughts,
  situation,
  reaction,
  current_page
})

export default rootReducer