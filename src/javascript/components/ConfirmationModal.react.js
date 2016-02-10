/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import ReactDOM from 'react-dom';
const update = require('react-addons-update');
const Modal = require('react-modal');

const customStyles = {
  content: {
    position					: 'relative',
    margin						: '120px 32px',
    top                        : '0',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    background                 : 'white',
    borderRadius				: '0',
    border 						: 'none'
  },
  overlay: {
  	background: 'rgba(0,0,0,0.8)'
  }
}

const ConfirmationModal = React.createClass({

	
	
	getInitialState() {
    	return { isOpen: false };
	  },
	openModal: function() {
	    this.setState({ isOpen: true })
	},
	closeModal: function() {
	    this.setState({ isOpen: false })
	},
	handleClick: function() {

		
	},


  	render() {
    return (
      	<div className="confirmation-modal">
	      	<div className="modal-trigger">
	          <i className="fa fa-lg fa-question-circle visible-xs" onClick={this.openModal}></i>
	          <i className="fa fa-lg fa-question-circle hidden-xs trigger-desktop" onClick={this.openModal}></i>
	        </div>
	        <Modal
	          	isOpen={this.state.isOpen}
	          	onRequestClose={this.closeModal} 
	          	style={customStyles}>
	          	<p className="text-center padding">Are you sure?</p>
	          	<button className="btn btn-full-width btn-primary btn-square" onClick={this.handleClick}>OK</button>
	        </Modal>
      	</div>
    	);
  	}

});

module.exports = ConfirmationModal