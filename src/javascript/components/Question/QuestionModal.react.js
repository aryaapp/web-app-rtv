/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = require('react-modal');

const customStyles = {}

var QuestionModal = React.createClass({
  getInitialState() {
    return { isOpen: false };
  },
  openModal: function() {
    this.setState({ isOpen: true })
  },
  closeModal: function() {
    this.setState({ isOpen: false })
  },
  render() {
    return (
      <div>
        <span onClick={this.openModal}>?</span>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <button onClick={this.closeModal}>x</button>
          <h3>{this.props.title}</h3>
          <p>{this.props.body}</p>
          {this.props.children}
        </Modal>
      </div>
    );
  }
});

module.exports = QuestionModal
