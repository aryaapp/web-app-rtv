/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { reduxForm } from 'redux-form'
import { executeCreateAccount } from '../actions/createAccount'
import Recaptcha from 'react-google-recaptcha'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

const createAccountFormValidation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'At 8 characters'
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Doesn't match password."
  }

  if (!values.recaptcha) {

  }
  return errors;
};

class CreateAccountForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { fields: { email, password, password_confirmation, recaptcha}, handleSubmit } = this.props;

    let emailInvalidLabel = <label className="validation-message">Bitte gib eine gültige E-Mailadresse ein.</label>
    let passwordInvalidLabel = <label className="validation-message">Bitte gib eine Passwort mit mindestes 8 Zeichen ein.</label>
    let passwordConfirmationInvalidLabel = <label className="validation-message">Bitte gib das Password ein zweites mal genau gleich ein.</label>
    let captachNotConfirmed = <label className="validation-message">Bitte bestätige, dass du auch wirklich ein Mensch bist ;-)</label>

    return(
      <div className="form-group col-xs-12">
        <div className="col-xs-12">
          <p>Bitte bestätige, dass du auch wirklich ein Mensch bist ;-) und trage deine E-Mail-Adresse unten ein.</p>
        </div>
        <form onSubmit={ handleSubmit } >
          <div className="col-xs-12">
            <input
              className="form-control email-control"
              type='text'
              placeholder="Ihre E-Mailadresse"
              aria-describedby="basic-addon1"
              {...email} />
            { email.touched && email.error ? emailInvalidLabel : '' }
          </div>
          <div className="col-xs-12">
            <input
              className="form-control email-control"
              type="password"
              placeholder="Ihre Passwort"
              {...password} />
            { password.touched && password.error ? passwordInvalidLabel : '' }
          </div>
          <div className="col-xs-12">
            <input
              className="form-control email-control"
              type="password"
              placeholder="Nochmal das Passwort"
              {...password_confirmation} />
              { password_confirmation.touched && password_confirmation.error ? passwordConfirmationInvalidLabel : '' }
          </div>
          <div className="col-xs-12">
            <Recaptcha
              ref="recaptcha"
              sitekey="6LdJ2RETAAAAAPHK7GmcRZTPnZY0E3AGY0sivpAs"
              {...recaptcha}
            />
          </div>
          <div className="col-xs-12">
            <button className="btn btn-primary relative-button" onClick={ handleSubmit } >
              <span className="btn-text">Create Account</span>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const ReduxCreateAccountForm = reduxForm({
  form: 'createAccount',
  fields: ['email', 'password', 'password_confirmation', 'recaptcha'],
  validate: createAccountFormValidation
})(CreateAccountForm);


const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeCreateAccount: (email, password) => dispatch(executeCreateAccount(email, password)),
    navLogin: () => dispatch(pushPath('/login'))
  }
}

class CreateAccountView extends Component {
  constructor(props) {
    super(props)

    this.submitCreateAccount = this.submitCreateAccount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  submitCreateAccount(data) {
    console.log('submitCreateAccount called', data)
    this.props.executeCreateAccount(data.email, data.password)
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.user !== 'undefined' && typeof nextProps.user.id !== 'undefined') {
      console.log('account created')
      this.props.navLogin()
    }
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <h2>Create Account</h2>
          <ReduxCreateAccountForm
            onSubmit={this.submitCreateAccount}
          />
          <div className="col-xs-12">
            <button className="btn btn-primary relative-button" onClick={ this.props.navLogin } >
              <span className="btn-text">Login</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

CreateAccountView.propTypes = {
  executeCreateAccount: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountView)