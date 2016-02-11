/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux'
import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'

import Modal from 'react-modal'
import Content from '../constants/localizableStringsDE.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    navLogin: () => dispatch(routeActions.push('/login')),
    navHome: () => dispatch(routeActions.push('/home')),
  }
}

class EmailConfirmationView extends Component {
  constructor(props) {
    super(props)

    this.state = { loggedIn: false }

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.checkForRedirect = this.checkForRedirect.bind(this)
  }

  checkForRedirect(props) {
    if (typeof props.access_token !== 'undefined' && props.access_token.length > 0) {
      this.setState({ loggedIn: true })
    }
  }
  componentWillMount() {
    this.checkForRedirect(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkForRedirect(nextProps)
  }

  render() {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const loginButtons = <div className="col-xs-12 buttons-container">
                      <button className="btn nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navLogin}>
                        <span className="btn-text">Anmelden </span>
                      </button>
                    </div>
    const forwardButton = <div className="col-xs-12 buttons-container">
                            <button className="btn btn-primary nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.props.navHome}>
                              <span className="btn-text">Weiter</span>
                            </button>
                          </div>
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <div className="welcome-modal container-fluid">
            <div className="row full-height">
              <div className="col-xs-12 no-padding full-height">

                <div className="col-xs-12 tagebuch fade-in arya-animation animation2">
                  Achtsamkeits-Tagebuch
                  <p className="col-xs-12 heute fade-in arya-animation animation2">Deine E-Mailadresse ist nun bestätigt.</p>
                </div>
              </div>
            </div>
            { !this.state.loggedIn ? loginButtons : forwardButton }
          </div>

        </div>

      </div>
    )
  }
}


EmailConfirmationView.propTypes = {
  navHome: PropTypes.func.isRequired,
  navLogin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationView)