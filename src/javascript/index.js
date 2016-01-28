import 'babel-polyfill'
import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { routeActions } from 'react-router-redux'
import { persistStore } from 'redux-persist'

import configureStore from './store/configureStore'

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


Provider.childContextTypes = {
  store: React.PropTypes.object
}

const requireAuth = function(nextState, replaceState) {
  if (_.isEmpty(store.getState().access_token)) {
    store.dispatch(routeActions.push('/'));
    replaceState(null, '/')
  }
}

const history = createHistory()
const store = configureStore(history)

class AppProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { rehydrated: false }
  }
  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }
  render() {
    if(!this.state.rehydrated) {
      return <div>Loading...</div>
    }
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={WelcomeView} />
            <Route path="/home" component={HomeView} onEnter={requireAuth} />
            <Route path="/print" component={JournalPdfView} onEnter={requireAuth} />
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
    )
  }
}

render(<AppProvider />, document.getElementById('react-app') )
