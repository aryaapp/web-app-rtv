/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { reduxForm } from 'redux-form'
import { executeLogin } from '../actions/login'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeLogin: (email, password) => dispatch(executeLogin(email, password)),
    navHome: () => dispatch(pushPath('/home'))
  }
}

class LoginForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit } = this.props;

    return(
      <form onSubmit={ handleSubmit }>
        <input type='text' placeholder="E-Mail" { ...email } />
        <input type='password' placeholder="Password" { ...password } />
        <button onClick={ handleSubmit } className="btn btn-primary" type="submit" >Login</button>
      </form>
    )
  }
}

const ReduxLoginFrom = reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(LoginForm);

class LoginView extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    console.log('loginView nextProps', nextProps)
    if (typeof nextProps.access_token !== 'undefined' && nextProps.access_token.length > 0) {
      this.props.navHome();
    }
  }

  onSubmit(data) {
    this.props.executeLogin(data.email, data.password)
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <h2>Login View</h2>
          <ReduxLoginFrom
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

LoginView.propTypes = {
  executeLogin: PropTypes.func.isRequired,
  navHome: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)