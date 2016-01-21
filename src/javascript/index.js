import 'babel-polyfill'
import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
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
import CreateAccountView from './views/CreateAccountView'
import ThankYouView from './views/ThankYouView'
import WelcomeView from './views/WelcomeView'
import JournalPdfView from './views/JournalPdfView'


const store = configureStore(reducer)
const history = createHistory()

syncReduxAndRouter(history, store)

Provider.childContextTypes = {
  store: React.PropTypes.object
}

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={WelcomeView} />
        <Route path="/home" component={HomeView} />
        <Route path="/print" component={JournalPdfView} />
        <Route path="/login" component={LoginView} />
        <Route path="/anmelden" component={CreateAccountView} />
        <Route path="/feeling" component={FeelingView} />
        <Route path="/body" component={BodyView} />
        <Route path="/thoughts" component={ThoughtsView} />
        <Route path="/situation" component={SituationView} />
        <Route path="/reaction" component={ReactionView} />
        <Route path="/results" component={ResultsView} />
        <Route path="/thank-you" component={ThankYouView} />
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('react-app')
)
