/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { reduxForm } from 'redux-form'
import Recaptcha from 'react-google-recaptcha'

import { executeCreateAccount } from '../actions/createAccount'
import { executeSaveJournal } from '../actions/journals'
import {
  defaultQuestionnaireId,
  feelingQuestionId,
  bodyQuestionId,
  thoughtsQuestionId,
  situationQuestionId,
  reactionQuestionId
} from '../constants/ids'
import { intersperse, reverseArray } from '../utilities'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'

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
      <div className="form-group">
        <div className="col-xs-12">

        </div>
        <form onSubmit={ handleSubmit } >
            <input
              className="form-control email-control"
              type='text'
              placeholder="Ihre E-Mailadresse"
              aria-describedby="basic-addon1"
              {...email} />
            { email.touched && email.error ? emailInvalidLabel : '' }
            <input
              className="form-control email-control"
              type="password"
              placeholder="Ihre Passwort"
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
              Account erstellen
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


const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeCreateAccount: (email, password) => dispatch(executeCreateAccount(email, password)),
    executeSaveJournal: (journal_data) => dispatch(executeSaveJournal(journal_data)),
    navLogin: () => dispatch(pushPath('/login'))
  }
}

class CreateAccountView extends Component {
  constructor(props) {
    super(props)

    this.submitCreateAccount = this.submitCreateAccount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.prepareJournalData = this.prepareJournalData.bind(this)
    this.saveResults = this.saveResults.bind(this)
  }

  submitCreateAccount(data) {
    this.props.executeCreateAccount(data.email, data.password)
  }

  prepareJournalData() {
    let data = {
      questionnaire_id: defaultQuestionnaireId,
      feeling: this.props.feeling.value,
      answers: [
        {
          question_id: bodyQuestionId,
          values: this.props.body
        }, {
          question_id: thoughtsQuestionId,
          values: reverseArray(this.props.thoughts)
        }, {
          question_id: situationQuestionId,
          values: reverseArray(this.props.situation)
        }, {
          question_id: reactionQuestionId,
          values: reverseArray(this.props.reaction)
        }
      ]
    }
    return data
  }

  saveResults(e) {
    this.props.executeSaveJournal(this.prepareJournalData())
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.access_token !== 'undefined' && nextProps.access_token.length > 0) {
      if(this.props.moodTracking.scheduledJournalSave) {
        this.saveResults()
      }
    }
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <QuestionHeader>
            <div className="col-xs-1"></div>
            <QuestionTitle title="Account erstellen"/>
            <QuestionSubtitle subtitle="Erstelle einen Account, um deine Einträge in deinem persönlichen Achtsamkeits-Tagebuch zu speichern"/>
          </QuestionHeader>
          <QuestionMain>
            <ReduxCreateAccountForm
              onSubmit={this.submitCreateAccount}
            />
          </QuestionMain>
          <button className="test-btn" onClick={ this.props.navLogin } >
            <span className="btn-text">Zum Einloggen</span>
          </button>
        </div>
      </div>
    )
  }
}

CreateAccountView.propTypes = {
  executeCreateAccount: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountView)