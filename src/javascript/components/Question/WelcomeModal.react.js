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
    borderRadius               : '0',
    padding                    : '0'
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
    this.setState({ isOpen: false })
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
            
            <div className="welcome-text-container vertical-align-center fade-in arya-animation animation1">
              <i className="quote">„Jedem Anfang wohnt ein Zauber inne”</i><br/> 
                <span className="source">-Hermann Hesse</span>
            </div>
            <button className="btn btn-primary nav-button next-button fade-in arya-animation animation3" onClick={this.closeModal}>
              Anfangen <i className="fa fa-arrow-right"></i>
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