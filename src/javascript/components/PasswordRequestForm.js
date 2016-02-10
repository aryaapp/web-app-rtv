import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { includes } from 'lodash'

const passwordRequestValidation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

class PasswordRequestForm extends Component {
  render() {
    const { fields: { email }, handleSubmit } = this.props;
    const emailInvalidLabel = <label className="validation-message">Bitte gib eine gültige E-Mailadresse ein.</label>
    const emailNotFound = <label className="validation-message">Leider haben wir für deine E-Mailadresse keinen Zugang gespeichert.</label>

    return(
      <form onSubmit={ handleSubmit }>
        <input className="form-control email-control" type='text' placeholder="E-Mail" { ...email } />
        { email.touched && email.error ? emailInvalidLabel : '' }
        { includes(this.props.asyncErrors, 'User not found') ? emailNotFound : '' }
        <button onClick={ handleSubmit } className="btn btn-primary nav-button next-button relative-button" type="submit" >Anmelden</button>
      </form>
    )
  }
}

const ReduxPasswordRequestForm = reduxForm({
  form: 'password_request',
  fields: ['email'],
  validate: passwordRequestValidation
})(PasswordRequestForm)

export default ReduxPasswordRequestForm