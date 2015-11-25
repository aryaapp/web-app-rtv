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
      <div>
        <div className="modal-trigger">
          <i className="fa fa-lg" onClick={this.openModal}>o</i>
          <i className="fa fa-2x fa-question-circle hidden-xs trigger-desktop" onClick={this.openModal}></i>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal} 
          style={customStyles} >
          <div className="alert alert-success" >Your mood journal was successfully sent to your email</div>
          <div className="alert alert-error" >Thank you for becoming more mindful. Want to read more about the topic?
           Look <a href="">here</a> </div>
          <button className="btn btn-full-width btn-success" onClick={this.newJournal}>New Journal</button>
        </Modal>
      </div>
    );
  }
});

module.exports = ConfirmationModal