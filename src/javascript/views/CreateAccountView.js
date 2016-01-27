/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { executeCreateAccount } from '../actions/createAccount'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'
import CreateAccountForm from '../components/CreateAccountForm'

const mapDispatchToProps = (dispatch) => {
  return {
    executeCreateAccount: (email, password) => dispatch(executeCreateAccount(email, password))
  }
}

class CreateAccountView extends Component {
  constructor(props) {
    super(props)

    this.submitCreateAccount = this.submitCreateAccount.bind(this)
  }

  submitCreateAccount(data) {
    this.props.executeCreateAccount(data.email, data.password)
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <QuestionHeader>
            <div className="col-xs-1"></div>
            <QuestionTitle title="Zugang erstellen"/>
            <QuestionSubtitle subtitle="Erstelle einen Zugang, um deine Einträge in deinem persönlichen Achtsamkeits-Tagebuch zu speichern"/>
          </QuestionHeader>
          <QuestionMain>
            <CreateAccountForm
              onSubmit={this.submitCreateAccount}
            />
          </QuestionMain>

        </div>
      </div>
    )
  }
}

CreateAccountView.propTypes = {
  executeCreateAccount: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(CreateAccountView)
