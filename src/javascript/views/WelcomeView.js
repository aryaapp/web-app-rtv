/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'
import { size } from 'lodash'

import Modal from 'react-modal'
import Content from '../constants/localizableStringsDE.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    navFeeling: () => dispatch(routeActions.push('/tagebuch')),
    navLogin: () => dispatch(routeActions.push('/login')),
    navHome: () => dispatch(routeActions.push('/home')),
  }
}

class WelcomeView extends Component {
  constructor(props) {
    super(props)

    this.state = { loggedIn: false }

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.checkForRedirect = this.checkForRedirect.bind(this)
  }

  checkForRedirect(props) {
    if (typeof props.access_token !== 'undefined' && props.access_token.length > 0) {
      console.log('checkForRedirect token present')
      this.setState({ loggedIn: true })
      setTimeout(props.navHome, 10000)
    }
  }
  componentWillMount() {
    this.checkForRedirect(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkForRedirect(nextProps)
  }

  displayWelcomeMessage() {
    if(this.state.loggedIn) {
      const journalCount = size(this.props.journals)
      switch(journalCount) {
        case 2:
          return Content.SMART_INTRO_MESSAGES.two
        case 4:
          return Content.SMART_INTRO_MESSAGES.four
        case 6:
          return Content.SMART_INTRO_MESSAGES.six
        case 10:
          return Content.SMART_INTRO_MESSAGES.ten
      }
      const now = new Date()
      let messagePool = []

      if(now.getHours() < 12) {
        messagePool = messagePool.concat(
          Content.SMART_INTRO_MESSAGES.morning,
          Content.SMART_INTRO_MESSAGES.morning
        )
      }

      if(now.getHours() > 18) {
        messagePool = messagePool.concat(
          Content.SMART_INTRO_MESSAGES.evening,
          Content.SMART_INTRO_MESSAGES.evening
        )
      }

      messagePool = messagePool.concat(Content.SMART_INTRO_MESSAGES.random)
      let message = messagePool[Math.floor(Math.random() * messagePool.length)]
      return message
    } else {
      return Content.INTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
    }
  }

  render() {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const loginButtons = <div className="col-xs-12 buttons-container">
                      <button className="btn btn-primary nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navFeeling}>
                        <span className="btn-text">Ich bin neu hier</span>
                      </button>
                      <button className="btn nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navLogin}>
                        <span className="btn-text">Anmelden </span>
                      </button>
                    </div>
    const forwardButton = <div className="col-xs-12 buttons-container">
                            <button className="btn btn-primary nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navHome}>
                              <span className="btn-text">Weiter</span>
                            </button>
                          </div>
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <div className="welcome-modal container-fluid">
            <div className="row full-height">
              <div className="col-xs-12 no-padding full-height">

                <div className="col-xs-12 tagebuch fade-in arya-animation animation2">
                  Achtsamkeits-Tagebuch
                  <p className="col-xs-12 heute fade-in arya-animation animation2">Heute, hier und jetzt.<br/>{ date.toLocaleDateString('de-DE', options) }</p>
                </div>
                <div className="col-xs-12 welcome-text margin-bottom fade-in arya-animation animation1">
                  <i>{ this.displayWelcomeMessage() }</i>
                </div>
              </div>
            </div>
            { !this.state.loggedIn ? loginButtons : forwardButton }
          </div>

        </div>

      </div>
    )
  }
}


WelcomeView.propTypes = {
  navFeeling: PropTypes.func.isRequired,
  navLogin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView)