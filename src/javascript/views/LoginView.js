/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { executeLogin } from '../actions/login'

import LoginForm from '../components/LoginForm'
import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'

const mapStateToProps = (state) => {
  return {
    errors: state.errors.login,
    access_token: state.access_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    executeLogin: (email, password) => dispatch(executeLogin(email, password)),
    navHome: () => dispatch(routeActions.push('/home'))
  }
}

class LoginView extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.checkForRedirect = this.checkForRedirect.bind(this)
  }
  checkForRedirect(props) {
    if (typeof props.access_token !== 'undefined' && props.access_token.length > 0) {
      props.navHome();
    }
  }
  componentDidMount() {
    this.checkForRedirect(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkForRedirect(nextProps)
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
            <LoginForm
              asyncErrors={this.props.errors}
              onSubmit={this.onSubmit}
            />
          </QuestionMain>
        </div>
      </div>
    )
  }
}

LoginView.propTypes = {
  executeLogin: PropTypes.func.isRequired,
  navHome: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)