/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'
import ReactDOM from 'react-dom'
const Modal = require('react-modal')

const CheckBoxInput = require('./CheckBoxInput.react.js')

const customStyles = {
  content : {
    position                   : 'absolute',
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
  render() {
    return (
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="success-icon text-center"><i className="fa fa-3x fa-check"></i></div>
          <div className="alert alert-success" >Your mood journal was successfully sent to your email</div>
          <div className="welcome-text-container vertical-align-center fade-in arya-animation animation2">
            <i className="quote">Mach’s gut und bleib achtsam!</i><br/> 
          </div>
          <button className="btn btn-primary nav-button next-button" onClick={this.newJournal}>Weiter lesen über Achtsamkeit</button>
        </Modal>
    );
  }
});

module.exports = ConfirmationModal