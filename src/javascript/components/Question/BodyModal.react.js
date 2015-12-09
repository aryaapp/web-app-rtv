/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import ReactDOM from 'react-dom';
const update = require('react-addons-update');
const Modal = require('react-modal');

const CheckBoxInput = require('./CheckBoxInput.react.js');
let Content = require('../../constants/localizableStringsDE.js')

const customStyles = {
  content : {
    padding: '0'
  }
}

const BodyModal = React.createClass({
  statics: {
    getOptions: function(role) {
      let optionTemplete = {
        head: Content.QUESTION_BODY_HEAD_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        chest: Content.QUESTION_BODY_CHEST_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        abdomen: Content.QUESTION_BODY_ABDOMEN_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        hip: Content.QUESTION_BODY_HIP_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        left_arm: Content.QUESTION_BODY_LEFT_ARM_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        right_arm: Content.QUESTION_BODY_RIGHT_ARM_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        left_leg: Content.QUESTION_BODY_LEFT_LEG_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS),
        right_leg: Content.QUESTION_BODY_RIGHT_LEG_OPTIONS.concat(Content.QUESTION_BODY_GENERIC_OPTIONS)
      }
      return optionTemplete[role].map((e) => { return { value: e, label: e } } )
    }
  },
  getDefaultProps() {
    return {
      values: [],
      role: 'head',
      title: '',
    }
  },
  getInitialState() {
    return {
      isOpen: false,
      newOption: '',
      options: BodyModal.getOptions(this.props.role)
    };
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

  addOption: function(e) {
    e.preventDefault();
    // check if value is there
    if(this.state.newOption.length == 0) {
      return false;
    }
    // check if value is allready there
    if(this.state.options.map((e) => { return e.value }).indexOf(this.state.newOption) != -1) {
      return false;
    }
    let newOptions = update(
      this.state.options,
      { $push: [{ value: this.state.newOption, label:this.state.newOption, checked: true }] }
    )
    this.setState({ options: newOptions, newOption: '' })
    this.update(update(this.props.values, { $push: [this.state.newOption] } ))
  },

  updateNewOption: function(e) {
    this.setState({ newOption: e.target.value })
  },

  render() {
    return (
      <div className="body-modal">
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="scrollable-container">
            <h3 className="body-modal-title">{this.props.title}</h3>
            <form onSubmit={this.addOption}>
              <input
                className="form-control"
                type='text'
                value={this.state.newOption}
                onChange={this.updateNewOption}
                placeholder='Sonstiges' />
            </form>
            <CheckBoxInput values={this.props.values} options={this.state.options} onChange={this.update} />
          </div>
          <button className="btn btn-full-width btn-primary btn-square" onClick={this.closeModal}>OK</button>
        </Modal>
      </div>
    );
  }
});

module.exports = BodyModal
