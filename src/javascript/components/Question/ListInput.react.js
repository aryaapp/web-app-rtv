/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let detectMobile = function () { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 // || navigator.userAgent.match(/iPhone/i)
 // || navigator.userAgent.match(/iPad/i)
 // || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

var ListInput = React.createClass({
  getDefaultProps() {
    return {
      value: [],
      placeholder: ''
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
    if(e != undefined) {
      e.preventDefault();
    }
    // check if value is there
    if(this.state.newValue.length == 0) {
      return false;
    }
    // check if value is allready there
    if(this.props.value.indexOf(this.state.newValue) != -1) {
      return false;
    }

    var newParentState = this.props.value.slice()
    newParentState.unshift(this.state.newValue)

    this.update(newParentState)
    this.setState({ newValue: '' })
  },
  removeValue: function(i) {
    var newParentState = this.props.value.slice()
    newParentState.splice(i,1)
    this.update(newParentState)

  },
  componentWillUnmount : function () {
    this.addValue()
  },
  handleFocus: function() {
     if(detectMobile()) {
      $( ".nav-button" ).hide();
     }
  },
  handleBlur: function() {
    if(detectMobile()) {
     $( ".nav-button" ).show();
    }
  },
  render: function() {
    var that = this
    return (
      <div>
        <form onSubmit={this.addValue}>
          <input
            onFocus={this.handleFocus} 
            onBlur={this.handleBlur}
            className="form-control"
            type='text'
            value={this.state.newValue}
            onChange={this.updateState}
            placeholder={this.props.placeholder} />
          <button id='list-submit-button' className="btn btn-primary" type="submit" ><i className="fa fa-plus"></i></button>
        </form>
        <ul className="list rtv-list">
          {
            this.props.value.map(function(element, i) {
              return (
                <li
                  className="list-item rtv-list-item" key={i}>{element} <i style={ {cursor: 'pointer'} } className="fa fa-close rtv-list-item-delete" onClick={that.removeValue.bind(null,i)}></i>
                </li>
              )
            })
          }
          <li className="list-item rtv-list-counter">{this.props.value.length} Einträge</li>
        </ul>
      </div>
        )
    }
})


module.exports = ListInput

// <button type='submit' onClick={this.addValue}>add</button>
