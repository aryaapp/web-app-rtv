/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import ReactDOM from 'react-dom';
const Modal = require('react-modal');

const CheckBoxInput = require('./CheckBoxInput.react.js');
const customStyles = {}

const BodyModal = React.createClass({
  getDefaultProps() {
    return {
      values: [],
      options: [{ value: 'pain', label: 'Pain' }],
      title: '',
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
  update: function(value) {
    this.props.onChange(value)
  },
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <h2>{this.props.title}</h2>
          <CheckBoxInput values={this.props.values} options={this.props.options} onChange={this.update} />
          <button className="btn btn-full-width btn-success" onClick={this.closeModal}>OK</button>
        </Modal>
      </div>
    );
  }
});

module.exports = BodyModal
