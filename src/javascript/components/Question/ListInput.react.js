/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var ListInput = React.createClass({
  getDefaultProps() {
    return {
      value: [],
    };
  },
  getInitialState: function() {
      return {
        newValue: ''
      }
  },
  update: function(value) {
    this.props.onChange(value);
  },
  updateState: function(e) {
    this.setState({ newValue: e.target.value })
  },
  addValue: function(e) {
    e.preventDefault();
    // check if value is there
    if(this.state.newValue.length == 0) {
      return false;
    }
    // check if value is allready there
    if(this.props.value.indexOf(this.state.newValue) != -1) {
      return false;
    }

    console.log('addValue', this.state.newValue)

    var newParentState = this.props.value.slice()
    newParentState.push(this.state.newValue)

    console.log('newArray', newParentState)

    this.update(newParentState)
    this.setState({ newValue: '' })
  },
  removeValue: function(i) {
    console.log('index', i)
    var newParentState = this.props.value.slice()
    newParentState.splice(i,1)
    console.log('newArray', newParentState)
    this.update(newParentState)

  },
  render: function() {
    var that = this
    return (
      <div>
        <form onSubmit={this.addValue}>
          <input
            type='text'
            value={this.state.newValue}
            onChange={this.updateState}
            placeholder='z. B. Ich sitze im Büro.' />
          <button type='submit' onClick={this.addValue}>add</button>
        </form>
        <ul>
          {
            this.props.value.map(function(element, i) {
              return (
                <li
                  key={i}>{element} <i style={ {cursor: 'pointer'} } onClick={that.removeValue.bind(null,i)}>x</i>
                </li>
              )
            })
          }
        </ul>
      </div>
        )
    }
})


module.exports = ListInput
