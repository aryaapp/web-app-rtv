/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = require('react-modal');
const Content = require('../../constants/localizableStringsDE.js')


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
var options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

var WelcomeModal = React.createClass({
  getInitialState() {
    return { isOpen: true };
  },
  openModal: function() {
    this.setState({ isOpen: true })
  },
  closeModal: function() {
    this.setState({ isOpen: false })
  },
  displayWelcomeMessage: function() {
    return Content.INTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
  },
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
            <button className="btn btn-primary nav-button next-button fade-in arya-animation animation3" onClick={this.closeModal}>
              <span className="btn-text">Anfangen </span><i className="fa fa-arrow-right"></i>
            </button>
            </div>
            </div>
          </div>
        </Modal>

    );
  }
});

module.exports = WelcomeModal

//modal toggle add classnames for desktop
//<h3 className="rtv-title welcome-title">Moodtracker</h3>

