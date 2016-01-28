require('jquery')

import React from 'react'
import ReactDOM from 'react-dom'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import StaticContainer from 'react-static-container'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import FeelingQuestion from './components/Question/FeelingQuestion.react.js'
import ThoughtsQuestion from './components/Question/ThoughtsQuestion.react.js'
import SituationQuestion from './components/Question/SituationQuestion.react.js'
import ReactionQuestion from './components/Question/ReactionQuestion.react.js'
import BodyQuestion from './components/Question/BodyQuestion.react.js'
import ResultsScreen from './components/ResultsScreen.react.js'
import PrevButton from './components/Reusable/PrevButton.react.js'
import NextButton from './components/Reusable/NextButton.react.js'
import PageNumber from './components/PageNumber.react.js'
import WelcomeView from './views/WelcomeView'
import LoginView from './views/LoginView'


// /**
//  * <RouteCSSTransitionGroup> renders twice on a route change. On the first
//  * render, it "freezes" the transitioning-out component by setting
//  * `shouldUpdate` on the <StaticContainer> to `false`. This prevents any
//  * <Link>s nested under the old component from updating their active state to
//  * reflect the new location, to allow for a smooth transition out. It then
//  * renders the new, transitioning-in component immediately afterward.
//  */
// class RouteCSSTransitionGroupWrapper extends React.Component {
//   constructor(props, context) {
//     super(props, context)

//     this.state = {
//       previousPathname: null
//     }
//   }

//   componentWillReceiveProps(nextProps, nextContext) {
//     if (nextContext.location.pathname !== this.context.location.pathname) {
//       this.setState({ previousPathname: this.context.location.pathname })
//     }
//   }

//   render() {
//     const { children, ...props } = this.props
//     const { previousPathname } = this.state

//     return (
//       <ReactCSSTransitionGroup {...props}>
//         <StaticContainer
//           key={previousPathname || this.context.location.pathname}
//           shouldUpdate={!previousPathname}
//         >
//           {children}
//         </StaticContainer>
//       </ReactCSSTransitionGroup>
//     )
//   }

//   componentDidUpdate() {
//     if (this.state.previousPathname) {
//       this.setState({ previousPathname: null })
//     }
//   }
// }

// RouteCSSTransitionGroupWrapper.contextTypes = {
//   location: React.PropTypes.object
// }

const App = React.createClass({
  render: function() {
    return (
      <div className="gradient-background">
        <div id="main-app">
          <ReactCSSTransitionGroup component="div" className="transition-group" transitionName="page" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            { this.props.children }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
});

export default connect((state) => state)(App)
