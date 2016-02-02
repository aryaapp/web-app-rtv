/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'

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

export default class ListInput extends Component {
  constructor(props) {
    super(props)

    this.state = { newValue: '' }

    this.update = this.update.bind(this)
    this.updateState = this.updateState.bind(this)
    this.addValue = this.addValue.bind(this)
    this.removeValue = this.removeValue.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  update(value) {
    this.props.onChange(value);
  }

  updateState(e) {
    this.setState({ newValue: e.target.value })
  }

  addValue(e) {
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
  }

  removeValue(i) {
    var newParentState = this.props.value.slice()
    newParentState.splice(i,1)
    console.log('list update remove old new', this.props.value, newParentState)
    this.update(newParentState)
  }

  componentWillUnmount() {
    this.addValue()
  }

  handleFocus() {
     if(detectMobile()) {
      $( ".nav-button" ).hide();
     }
  }

  handleBlur() {
    if(detectMobile()) {
     $( ".nav-button" ).show();
    }
  }

  render() {
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
            this.props.value.map((element, i) => {
              return (
                <li
                  className="list-item rtv-list-item" key={i}>{element} <i style={ {cursor: 'pointer'} } className="fa fa-close rtv-list-item-delete" onClick={this.removeValue.bind(null,i)}></i>
                </li>
              )
            })
          }
          <li className="list-item rtv-list-counter">{this.props.value.length} Einträge</li>
        </ul>
      </div>
    )
  }
}
ListInput.defaultProps = {
  value: [],
  placeholder: ''
}