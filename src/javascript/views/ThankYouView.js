/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import Content from '../constants/localizableStringsDE.js'
import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    navHome: () => dispatch(routeActions.push('/home')),
  }
}

class ThankYouView extends Component {
  constructor(props) {
    super(props)
    this.navHome = this.navHome.bind(this)
  }

  displayThankYouMessage() {
    return Content.OUTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
  }

  navHome() {
    this.props.navHome()
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <div className="welcome-modal container-fluid">
            <div className="row full-height">
              <div className="col-xs-12 full-height">
                <div className="success-icon"><i className="fa fa-3x fa-check"></i></div>
                <div className="alert alert-success" >Dein Eintrag wurde erfolgreich gespeichert.</div>
                <div className="col-xs-12 welcome-text margin-bottom fade-in arya-animation animation2">
                  <i>{ this.displayThankYouMessage() }</i>
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <button className="btn btn-primary nav-button next-button relative-button fade-in arya-animation animation3" onClick={this.navHome}>Home</button>
              <button className="btn nav-button next-button relative-button fade-in arya-animation animation3" >Mehr zum Thema Achtsamkeit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


ThankYouView.propTypes = {
  navHome: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouView)