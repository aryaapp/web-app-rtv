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

// let jsPDF = require('jspdf')

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeLogin: (email, password) => dispatch(executeLogin(email, password)),
    navHome: () => dispatch(pushPath('/home'))
  }
}

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
})(LoginForm);

class LoginView extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps(nextProps) {
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
          <QuestionHeader>
            <div className="col-xs-1"></div>
            <QuestionTitle title="Einloggen"/>
            <QuestionSubtitle subtitle="Logge dich zu deinem persönlichen Achtsamkeits-Tagebuch ein"/>
          </QuestionHeader>
          <QuestionMain>
            <ReduxLoginFrom
              asyncErrors={this.props.errors}
              onSubmit={this.onSubmit}
            />
          </QuestionMain>
        </div>
      </div>
    )
  }
}

LoginView.contextTypes = {
  store: React.PropTypes.object
}

LoginView.propTypes = {
  executeLogin: PropTypes.func.isRequired,
  navHome: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)