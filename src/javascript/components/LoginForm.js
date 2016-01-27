import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const createLoginFormValidation = (values) => {
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
  return errors;
}

class LoginForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    const emailInvalidLabel = <label className="validation-message">Bitte gib eine gültige E-Mailadresse ein.</label>
    const passwordInvalidLabel = <label className="validation-message">Dein Passwort hatte mindestes 8 Zeichen.</label>
    const loginFailed = <label className="validation-message">Leider sind Ihre Zugangsdaten nicht gültig.</label>

    return(
      <form onSubmit={ handleSubmit }>
        <input className="form-control email-control" type='text' placeholder="E-Mail" { ...email } />
        { email.touched && email.error ? emailInvalidLabel : '' }
        <input className="form-control email-control" type='password' placeholder="Password" { ...password } />
        { password.touched && password.error ? passwordInvalidLabel : '' }
        { _.includes(this.props.asyncErrors, 'invalid credentials') ? loginFailed : '' }
        <button onClick={ handleSubmit } className="btn btn-primary nav-button next-button relative-button" type="submit" >Anmelden</button>
      </form>
    )
  }
}

const ReduxLoginFrom = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: createLoginFormValidation
})(LoginForm)

export default ReduxLoginFrom