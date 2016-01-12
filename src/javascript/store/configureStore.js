import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  loggerMiddleware
)(createStore);

export default function configureStore(rootReducer) {
  const store = createStoreWithMiddleware(rootReducer)
  return store
}
