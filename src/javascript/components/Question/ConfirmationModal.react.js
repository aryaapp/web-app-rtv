/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'
import ReactDOM from 'react-dom'
const Modal = require('react-modal')

const CheckBoxInput = require('./CheckBoxInput.react.js')
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
    borderRadius               : '0'
  }
}

const ConfirmationModal = React.createClass({
  getDefaultProps() {
    return {
      values: [],
      title: ''
    }
  },
  getInitialState() {
    return { isOpen: false };
  },
  openModal: function() {
    this.setState({ isOpen: true })
  },
  closeModal: function() {
    this.setState({ isOpen: false })
  },
  newJournal: function() {
    console.log('clear state and scroll to question 1')
  },
  update: function(value) {
    this.props.onChange(value)
  },
  displayThankYouMessage: function() {
    return Content.OUTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
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
                <div className="success-icon"><i className="fa fa-3x fa-check"></i></div>
                <div className="alert alert-success" >Dein Eintrag wurde erfolgreich an deine Email Adresse geschickt.</div>
                <div className="welcome-text-container rtv-title vertical-align-center fade-in arya-animation animation2">
                  <h3><i>{ this.displayThankYouMessage() }</i></h3>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary nav-button next-button fade-in arya-animation animation3" onClick={this.newJournal}>Mehr zum Thema Achtsamkeit</button>
        </Modal>
    );
  }
});

module.exports = ConfirmationModal