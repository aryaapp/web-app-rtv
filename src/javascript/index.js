import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

import configureStore from './store/configureStore'
import reducer from './reducers'

import App from './app'
import FeelingView from './views/FeelingView'
import BodyView from './views/BodyView'
import ThoughtsView from './views/ThoughtsView'
import SituationView from './views/SituationView'
import ReactionView from './views/ReactionView'
import ResultsView from './views/ResultsView'
import LoginView from './views/LoginView'
import HomeView from './views/HomeView'


const store = configureStore(reducer)
const history = createHistory()

syncReduxAndRouter(history, store)

render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/home" component={HomeView} />
          <Route path="/login" component={LoginView} />
          <Route path="/feeling" component={FeelingView} />
          <Route path="/body" component={BodyView} />
          <Route path="/thoughts" component={ThoughtsView} />
          <Route path="/situation" component={SituationView} />
          <Route path="/reaction" component={ReactionView} />
          <Route path="/results" component={ResultsView} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('react-app')
)
