import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { includes } from 'lodash'

const passwordResetValidation = (values) => {
  let errors = {};
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

  return errors
}

class PasswordResetForm extends Component {
  render() {
    const { fields: { password, password_confirmation }, handleSubmit } = this.props;
    const passwordInvalidLabel = <label className="validation-message">Dein Passwort hatte mindestes 8 Zeichen.</label>
    const passwordConfirmationInvalidLabel = <label className="validation-message">Bitte gib das Password ein zweites mal genau gleich ein.</label>
    const tokenInvalid = <label className="validation-message">
                           Leider konnten wir dein Passwort nicht neu setzen. Der Link in der E-Mail ist nur eine Stunde gültig.
                         </label>

    return(
      <form onSubmit={ handleSubmit }>
        <input className="form-control email-control"
          type='password'
          placeholder="Password"
          { ...password } />
        { password.touched && password.error ? passwordInvalidLabel : '' }
        <input className="form-control email-control"
          type='password'
          placeholder="Password wiederholung"
          { ...password_confirmation } />
        { password_confirmation.touched && password_confirmation.error ? passwordConfirmationInvalidLabel : '' }
        { includes(this.props.asyncErrors, 'User not found') ? tokenInvalid : '' }
        <button onClick={ handleSubmit } className="btn btn-primary nav-button next-button relative-button" type="submit" >Anmelden</button>
      </form>
    )
  }
}

const ReduxPasswordResetForm = reduxForm({
  form: 'password_set',
  fields: ['password','password_confirmation'],
  validate: passwordResetValidation
})(PasswordResetForm)

export default ReduxPasswordResetForm