/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'

import Modal from 'react-modal'
import Content from '../constants/localizableStringsDE.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    navFeeling: () => dispatch(pushPath('/feeling')),
    navLogin: () => dispatch(pushPath('/login')),
  }
}

class WelcomeView extends Component {
  constructor(props) {
    super(props)
  }

  displayWelcomeMessage() {
    return Content.INTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
  }

  render() {
    let date = new Date();
    let options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

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
                  <i className="">{ this.displayWelcomeMessage() }</i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 buttons-container">
            <button className="btn btn-primary nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navFeeling}>
              <span className="btn-text">Ich bin neu hier</span>
            </button>
            <button className="btn nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navLogin}>
              <span className="btn-text">Anmelden </span>
            </button>
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