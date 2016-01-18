/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import Content from '../constants/localizableStringsDE.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    navHome: () => dispatch(pushPath('/home'))
  }
}

class ThankYouView extends Component {
  constructor(props) {
    super(props)
  }

  displayThankYouMessage() {
    return Content.OUTRO_MESSAGES[Math.floor(Math.random() * Content.INTRO_MESSAGES.length)]
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <div className="welcome-modal container-fluid">
            <div className="row full-height">
              <div className="col-xs-12 no-padding full-height">
                <div className="success-icon"><i className="fa fa-3x fa-check"></i></div>
                <div className="alert alert-success" >Dein Eintrag wurde erfolgreich gespeichert.</div>
                <div className="welcome-text-container rtv-title vertical-align-center fade-in arya-animation animation2">
                  <h3><i>{ this.displayThankYouMessage() }</i></h3>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary nav-button prev-button fade-in arya-animation animation3" onClick={this.props.navHome}>Home</button>
          <button className="btn btn-primary nav-button next-button fade-in arya-animation animation3" >Mehr zum Thema Achtsamkeit</button>
        </div>
      </div>
    )
  }
}


ThankYouView.propTypes = {
  navHome: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouView)