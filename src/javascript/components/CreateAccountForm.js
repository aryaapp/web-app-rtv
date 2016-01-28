import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Recaptcha from 'react-google-recaptcha'

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
}

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
      <div className="form-group">
        <div className="col-xs-12">

        </div>
        <form onSubmit={ handleSubmit } >
            <input
              className="form-control email-control"
              type='text'
              placeholder="Deine E-Mail-Adresse"
              aria-describedby="basic-addon1"
              {...email} />
            { email.touched && email.error ? emailInvalidLabel : '' }
            <input
              className="form-control email-control"
              type="password"
              placeholder="Dein Passwort"
              {...password} />
            { password.touched && password.error ? passwordInvalidLabel : '' }
            <input
              className="form-control email-control"
              type="password"
              placeholder="Nochmal das Passwort"
              {...password_confirmation} />
              { password_confirmation.touched && password_confirmation.error ? passwordConfirmationInvalidLabel : '' }
            <div className="col-xs-12 margin-top">
              <p>Bitte bestätige, dass du auch wirklich ein Mensch bist ;-)</p>
              <Recaptcha
                ref="recaptcha"
                sitekey="6LdJ2RETAAAAAPHK7GmcRZTPnZY0E3AGY0sivpAs"
                {...recaptcha}
              />
            </div>
            <button className="btn btn-primary nav-button next-button relative-button" onClick={ handleSubmit } >
              Zugang erstellen
            </button>
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

export default ReduxCreateAccountForm