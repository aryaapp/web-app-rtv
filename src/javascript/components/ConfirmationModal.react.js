/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { update } from 'react-addons-update';
import Modal from 'react-modal';

const customStyles = {
  content: {
    position					         : 'relative',
    margin						         : '120px 32px',
    top                        : '0',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    padding                    : '0',
    background                 : 'white',
    borderRadius			         : '0',
    border 						         : 'none'
  },
  overlay: {
  	background: 'rgba(0,0,0,0.8)'
  }
}

class ConfirmationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
			isOpen : false
    }

    this.handleClick = this.handleClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
	handleClick() {
		this.props.onClick()
	}
  closeModal() {
    this.props.closeModal()
  }
  render() {
    return (
    	<div className="confirmation-modal">
        <Modal
          	isOpen={this.props.isOpen}
          	onRequestClose={this.closeModal} 
          	style={customStyles}>
          	<p className="text-center padding">Bist du Sicher?</p>
            <div className="col-xs-12">
          	  <button className="btn btn-primary nav-button next-button relative-button" onClick={this.handleClick}>OK</button>
            </div>
            <div className="col-xs-12">
              <button className="btn nav-button next-button relative-button" onClick={this.closeModal}>Abbrechen</button>
            </div>
        </Modal>
    	</div>
  	);
  }

}

export default (ConfirmationModal)