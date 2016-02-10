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
    borderRadius			: '0',
    border 						: 'none'
  },
  overlay: {
  	background: 'rgba(0,0,0,0.8)'
  }
}

const ConfirmationModal = React.createClass({

	defaultProps: function() {
		return ({
			isOpen : false
		})
	},
	handleClick: function() {
		this.props.onClick()
	},


  	render() {
    return (
      	<div className="confirmation-modal">
	        <Modal
	          	isOpen={this.props.isOpen}
	          	onRequestClose={this.closeModal} 
	          	style={customStyles}>
	          	<p className="text-center padding">Bist du Sicher?</p>
	          	<button className="btn btn-full-width btn-primary btn-square" onClick={this.handleClick}>OK</button>
	        </Modal>
      	</div>
    	);
  	}

});

module.exports = ConfirmationModal