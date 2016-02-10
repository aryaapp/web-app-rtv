/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { isEmpty } from 'lodash'

import { executePasswordRequest, executePasswordSet } from '../actions/login'

import PasswordRequestForm from '../components/PasswordRequestForm'
import PasswordResetForm from '../components/PasswordResetForm'
import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    executePasswordRequest: (email) => dispatch(executePasswordRequest(email)),
    executePasswordSet: (password_token, password) => dispatch(executePasswordSet(password_token, password)),
    navLogin: () => dispatch(routeActions.push('/login'))
  }
}

class PasswordResetView extends Component {
  constructor(props) {
    super(props)
    this.state = { submitted: false, password_token: null }
    this.submitRequest = this.submitRequest.bind(this)
    this.submitReset = this.submitReset.bind(this)
  }

  submitRequest(data) {
    this.props.executePasswordRequest(data.email)
    this.setState({ submitted: true })
  }

  submitReset(data) {
    this.props.executePasswordSet(this.state.password_token, data.password)
    this.setState({ submitted: true })
  }

  componentWillMount() {
    this.setState({ password_token: this.props.params.password_token })
  }

  render() {
    const { password_request, password_set } = this.props.errors
    const { password_token, submitted } = this.state
    const requestForm = <PasswordRequestForm
                          asyncErrors={password_request}
                          onSubmit={this.submitRequest}
                        />
    const resetForm = <PasswordResetForm
                        asyncErrors={password_set}
                        onSubmit={this.submitReset}
                      />
    let submitMessage = ''
    if(password_token) {
      submitMessage = 'Bitte melde dich mit deinem neuen Password an.'
    } else {
      submitMessage = 'Du solltest eine E-Mail erhalten haben.'
    }
    const displaySubmitMessage = submitted && isEmpty(password_request) && isEmpty(password_set)

    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <QuestionHeader>
            <div className="col-xs-1"></div>
            <QuestionTitle title="Password neusetzen"/>
            <QuestionSubtitle subtitle="Setze dir ein neues Password für dein Achtsamkeits-Tagebuch"/>
          </QuestionHeader>
          <QuestionMain>
            { this.state.password_token ? resetForm : requestForm }
            { displaySubmitMessage ? submitMessage : '' }
          </QuestionMain>
        </div>
      </div>
    )
  }
}

PasswordResetView.propTypes = {
  executePasswordSet: PropTypes.func.isRequired,
  executePasswordRequest: PropTypes.func.isRequired,
  navLogin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetView)