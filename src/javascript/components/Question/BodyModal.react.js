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
        head: [
          { value: Content.QUESTION_BODY_HEADACHE, label: Content.QUESTION_BODY_HEADACHE },
          { value: Content.QUESTION_BODY_FLUSHED_FACE, label: Content.QUESTION_BODY_FLUSHED_FACE },
          { value: Content.QUESTION_BODY_DIZZY_AND_LIGHTHEADED, label: Content.QUESTION_BODY_DIZZY_AND_LIGHTHEADED },
          { value: Content.QUESTION_BODY_NECK_PAIN, label: Content.QUESTION_BODY_NECK_PAIN }
        ],
        chest: [
          { value: Content.QUESTION_BODY_CHEST_PAIN, label: Content.QUESTION_BODY_CHEST_PAIN },
          { value: Content.QUESTION_BODY_BREATHING, label: Content.QUESTION_BODY_BREATHING },
          { value: Content.QUESTION_BODY_PRESSURE_CHEST, label: Content.QUESTION_BODY_PRESSURE_CHEST },
          { value: Content.QUESTION_BODY_HEARTBEAT, label: Content.QUESTION_BODY_HEARTBEAT },
          { value: Content.QUESTION_BODY_BACK_PAIN, label: Content.QUESTION_BODY_BACK_PAIN },
          { value: Content.QUESTION_BODY_STIFNESS, label: Content.QUESTION_BODY_STIFNESS },
          { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
        ],
        hip: [
          { value: Content.QUESTION_BODY_DIGESTIVE, label: Content.QUESTION_BODY_DIGESTIVE },
          { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
          { value: Content.QUESTION_BODY_CROTCH, label: Content.QUESTION_BODY_CROTCH },
          { value: Content.QUESTION_BODY_TENSION, label: Content.QUESTION_BODY_TENSION },
        ],
        left_arm: [
          { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
          { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
          { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
          { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
        ],
        right_arm: [
          { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
          { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
          { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
          { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
        ],
        left_leg: [
          { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
          { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
          { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
          { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
        ],
        right_leg: [
          { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
          { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
          { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
          { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
        ]
      }
      return optionTemplete[role]
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
          <h2 className="body-modal-title">{this.props.title}</h2>
          <form onSubmit={this.addOption}>
            <input
              className="form-control"
              type='text'
              value={this.state.newOption}
              onChange={this.updateNewOption}
              placeholder='Meine Situation' />
          </form>
          <CheckBoxInput values={this.props.values} options={this.state.options} onChange={this.update} />
          <button className="btn btn-full-width btn-primary btn-square" onClick={this.closeModal}>OK</button>
        </Modal>
      </div>
    );
  }
});

module.exports = BodyModal
