/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
                <img src="./images/rtv_logo-1.png" className="welcome-rtv-image fade-in arya-animation animation2"/>
                <div className="col-xs-12 tagebuch fade-in arya-animation animation2">
                  Achtsamkeits-Tagebuch
                  <p className="col-xs-12 heute fade-in arya-animation animation2">Heute, hier und jetzt.<br/>{ date.toLocaleDateString('de-DE', options) }</p>
                </div>
                <div className="welcome-text-container rtv-title col-xs-12 vertical-align-center ">
                  <h3 className="fade-in arya-animation animation1">
                    <i className="">{ this.displayWelcomeMessage() }</i>
                  </h3>
                </div>
                <button className="btn btn-primary nav-button prev-button" onClick={this.props.navFeeling}>
                  <span className="btn-text">I'm new</span><i className="fa fa-arrow-right"></i>
                </button>
                <button className="btn btn-primary nav-button next-button" onClick={this.props.navLogin}>
                  <span className="btn-text">Log In </span><i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
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