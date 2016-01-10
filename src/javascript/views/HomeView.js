/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { executeLoadJournals } from '../actions/journals'
import { logout } from '../actions/login'



import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeLoadJournals: () => dispatch(executeLoadJournals())
    navMoodTracking: () => dispatch(pushPath('/feeling'))
    navJournals: () => dispatch(pushPath('/journals'))
    logout: () => dispatch(logout())
  }
}

class HomeView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <h2>Home View</h2>
          <button className="btn btn-primary nav-button next-button" onClick={this.props.navMoodTracking}>
            <span className="btn-text">Create Journals </span><i className="fa fa-arrow-right"></i>
          </button>
          <button className="btn btn-primary nav-button next-button" onClick={this.props.navJournals}>
            <span className="btn-text">My Journals </span><i className="fa fa-arrow-right"></i>
          </button>
          <button className="btn btn-primary nav-button next-button" onClick={this.props.logout}>
            <span className="btn-text">logout</span><i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  executeLoadJournals: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)