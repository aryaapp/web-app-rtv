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
    executeLoadJournals: () => dispatch(executeLoadJournals()),
    navMoodTracking: () => dispatch(pushPath('/feeling')),
    navJournals: () => dispatch(pushPath('/journals')),
    navStart: () => dispatch(pushPath('/')),
    logout: () => dispatch(logout())
  }
}

class HomeView extends Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
    this.props.navStart()
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <h2>Home View</h2>
          <ul>
            {
              this.props.journals.map((journal, i) => {
                return (<li key={ 'journal_' + i } >Date:{ journal.created_at }, Feeling: { journal.feeling }</li> )
              })
            }
          </ul>
          <div className="col-xs-12">
            <button className="btn nav-button relative-button" onClick={this.props.navMoodTracking}>
              <span className="btn-text">Create Journals </span>
            </button>
          </div>
          <div className="col-xs-12">
            <button className="btn nav-button relative-button" onClick={this.props.executeLoadJournals}>
              <span className="btn-text">Load Journals</span>
            </button>
          </div>
          <div className="col-xs-12">
            <button className="btn nav-button relative-button" onClick={this.logout}>
              <span className="btn-text">logout</span>
            </button>
          </div>
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