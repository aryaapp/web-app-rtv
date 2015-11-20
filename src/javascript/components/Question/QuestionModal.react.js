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
    background                 : 'rgba(0,0,0,0.8)',
    borderRadius               : '0',
    padding                    : '32px',
    color                      : '#fff'
  }
}

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
        <div className="modal-trigger">
          <i className="fa fa-lg fa-question-circle" onClick={this.openModal}></i>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="text-center">
            <i className="fa fa-lg fa-close" onClick={this.closeModal}></i>
          </div>
          <h3 className="rtv-title invert">{this.props.title}</h3>
          <p>{this.props.body}</p>
          {this.props.children}
        </Modal>
      </div>
    );
  }
});

module.exports = QuestionModal

//modal toggle add classnames for desktop