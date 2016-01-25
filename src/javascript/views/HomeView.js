/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import ReactSlider from 'rc-slider'

import { executeLoadJournals } from '../actions/journals'
import { logout } from '../actions/login'
import { nextWeek, prevWeek, setJournalsForPdf } from '../actions/homeView'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'
import JournalList from '../components/JournalList'

import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    beginningDate: state.homeView.beginningDate,
    endDate: state.homeView.endDate,
    selectedJournals: state.homeView.selectedJournals,
    journals: state.journals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    executeLoadJournals: () => dispatch(executeLoadJournals()),
    setJournalsForPdf: (journal_ids) => dispatch(setJournalsForPdf(journal_ids)),
    navMoodTracking: () => dispatch(pushPath('/feeling')),
    navJournals: () => dispatch(pushPath('/journals')),
    navStart: () => dispatch(pushPath('/')),
    navPrint: () => dispatch(pushPath('/print')),
    logout: () => dispatch(logout()),
    prevWeek: () => { dispatch(prevWeek()) },
    nextWeek: () => { dispatch(nextWeek()) }
  }
}

class HomeView extends Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.singleJournalPDF = this.singleJournalPDF.bind(this)
    this.weekPDF = this.weekPDF.bind(this)
    this.allJournalsPDF = this.allJournalsPDF.bind(this)
  }

  componentDidMount() {
    if(_.isEmpty(this.props.journals)) {
      this.props.executeLoadJournals();
    }
  }

  singleJournalPDF(journal) {
    let journal_ids = [journal.id]
    this.props.setJournalsForPdf(journal_ids)
    this.props.navPrint()
  }

  weekPDF() {
    let journal_ids = _.map(this.props.selectedJournals, (j) => j.id)
    this.props.setJournalsForPdf(journal_ids)
    this.props.navPrint()
  }

  allJournalsPDF() {
    let journal_ids = _.map(this.props.journals, (j) => j.id)

    this.props.setJournalsForPdf(journal_ids)
    this.props.navPrint()
  }

  logout() {
    this.props.logout()
    this.props.navStart()
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <QuestionHeader absolute={true}>
            <div className="col-xs-1"></div>
            <QuestionTitle title="Achtsamkeits-Tagebuch"/>
            <QuestionSubtitle subtitle={this.props.user.email}/>
          </QuestionHeader>
          <QuestionMain absolute={true}>
            <div>
              <button className="test-button" onClick={this.props.prevWeek}>
                <span className="btn-text">prev week</span>
              </button>
              <p>{this.props.beginningDate.toDateString()} - {this.props.endDate.toDateString()}</p>
              <button className="test-button" onClick={this.props.nextWeek}>
                <span className="btn-text">next week</span>
              </button>
            </div>
            <JournalList
              journals={this.props.selectedJournals}
              singleJournalPDF={this.singleJournalPDF}
            />
            <button className="btn btn-ghost btn-full-width" onClick={this.weekPDF}>
              EINTRÄGE DIESER WOCHE HERUNTERLADEN
            </button>
            <button className="btn btn-ghost btn-full-width" onClick={this.allJournalsPDF}>
              ALLE BISHERIGEN EINTRÄGE HERUNTERLADE
            </button>
            <button className="test-button" onClick={this.logout}>
              <span className="btn-text">logout</span>
            </button>
          </QuestionMain>
          <FixedSectionFooter>
          <div className="col-xs-12">
            <button className="btn nav-button btn-primary relative-button" onClick={this.props.navMoodTracking}>
              <span className="btn-text">Neuer Eintrag</span>
            </button>
          </div>
          </FixedSectionFooter>
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  beginningDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  selectedJournals: PropTypes.array.isRequired,
  executeLoadJournals: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  navMoodTracking:  PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
