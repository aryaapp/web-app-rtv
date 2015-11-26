/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = require('react-modal');

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

var WelcomeModal = React.createClass({
  getInitialState() {
    return { isOpen: true };
  },
  openModal: function() {
    this.setState({ isOpen: true })
  },
  closeModal: function() {
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);
    $('#fp-nav').show();
    $('#react-app').show();
    this.setState({ isOpen: false })
  },
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <h3 className="rtv-title">RTV Moodtracker</h3>
          <p>Nice to see you again! Let's get your mind empty and mindful</p>
          <button className="btn btn-full-width btn-success" onClick={this.closeModal}>Get Started</button>
        </Modal>
      </div>
    );
  }
});

module.exports = WelcomeModal

//modal toggle add classnames for desktop