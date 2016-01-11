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

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeCreateAccount: (email, password) => dispatch(executeCreateAccount(email, password))
  }
}

class CreateAccountForm extends Component {
  render() {
    console.log("CreateAccountForm props", this.props)
    const { fields: { email, password, password_confirmation }, handleSubmit } = this.props;
    return(
      <form onSubmit={ handleSubmit } >
        <div className="col-xs-12">
          <input type="text" placeholder="Ihre E-Mailadresse" {...email} />
        </div>
        <div className="col-xs-12">
          <input type="password" placeholder="Ihre Passwort" {...password} />
        </div>
        <div className="col-xs-12">
          <input type="password" placeholder="Nochmal das Passwort" {...password_confirmation} />
        </div>

        <button className="btn btn-primary nav-button next-button" onClick={ handleSubmit } >
          <span className="btn-text">Create Account</span>
        </button>
      </form>
    )
  }
}


const ReduxCreateAccountForm = reduxForm({
  form: 'createAccount',
  fields: ['email', 'password', 'password_confirmation']
})(CreateAccountForm);

class CreateAccountView extends Component {
  constructor(props) {
    super(props)

    this.submitCreateAccount = this.submitCreateAccount.bind(this)
  }

  submitCreateAccount(data) {
    console.log('submitCreateAccount called', data)
    this.props.executeCreateAccount(data.email, data.password)
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.user !== 'undefined' && nextProps.user.length > 0) {
      console.log('show message')
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
        </div>
      </div>
    )
  }
}

// CreateAccountView.propTypes = {
//   user: PropTypes.object.isRequired,
//   executeLoadJournals: PropTypes.func.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountView)