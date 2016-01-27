/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { executeLogin } from '../../actions/login'

import Modal from 'react-modal'
import Content from '../../constants/localizableStringsDE.js'

const customStyles = {
  content : {
    position                   : 'absolute',
    background                  : '#fafafa',
    top                        : '0',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    border                     : 'none',
    borderRadius               : '0',
    padding                    : '0'
  }
}

let date = new Date();
let options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

const mapDispatchToProps = (dispatch) => {
  return {
    navFeeling: () => dispatch(routeActions.push('/feeling')),
    navLogin: () => dispatch(routeActions.push('/login')),
  }
}

class WelcomeModal extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: true }

    this.openModal    = this.openModal.bind(this)
    this.closeModal   = this.closeModal.bind(this)
    this.login        = this.login.bind(this)
    this.moodTracking = this.moodTracking.bind(this)
  }

  openModal() {
    this.setState({ isOpen: true })
  }

  closeModal() {
    this.setState({ isOpen: false })
  }

  moodTracking() {
    this.closeModal()
    this.props.navFeeling()
  }

  login() {
    this.closeModal()
    this.props.navLogin()
  }

  displayWelcomeMessage() {
    return Content.INTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
  }

  render() {
    return (
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
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
                <button className="btn btn-primary nav-button prev-button" onClick={this.moodTracking}>
                  <span className="btn-text">I'm new</span><i className="fa fa-arrow-right"></i>
                </button>
                <button className="btn btn-primary nav-button next-button" onClick={this.login}>
                  <span className="btn-text">Log In </span><i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </Modal>
    )
  }
}

export default connect(state => state, mapDispatchToProps)(WelcomeModal)
