import { persistStore, autoRehydrate } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { syncHistory } from 'react-router-redux'
import rootReducer from '../reducers'


export default function configureStore(history) {
  const reduxRouterMiddleware = syncHistory(history)
  const loggerMiddleware = createLogger()

  const createStoreWithMiddleware = applyMiddleware(
    thunk,
    loggerMiddleware,
    reduxRouterMiddleware
  )(createStore);

  const rehydrateCallback = () => console.log('rehydration complete with state')
  const config = { blacklist: ['routing', 'form', 'errors'] }
  const store = autoRehydrate()(createStoreWithMiddleware)(rootReducer)

  persistStore(store, config, rehydrateCallback)

  return store
}
