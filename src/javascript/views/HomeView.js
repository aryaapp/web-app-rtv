/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import ReactSlider from 'rc-slider'

import { executeLoadJournals } from '../actions/journals'
import { clearAndLogout } from '../actions/login'
import { nextWeek, prevWeek, setJournalsForPdf, currentWeek } from '../actions/homeView'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'
import JournalList from '../components/JournalList'
import { formatDay } from '../utilities'

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
    navMoodTracking: () => dispatch(routeActions.push('/tagebuch')),
    navJournals: () => dispatch(routeActions.push('/journals')),
    navStart: () => dispatch(routeActions.push('/')),
    navPrint: () => dispatch(routeActions.push('/print')),
    logout: () => dispatch(clearAndLogout()),
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
          <QuestionHeader>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-1"></div>
                <QuestionTitle title="Achtsamkeits-Tagebuch"/>
                <QuestionSubtitle subtitle={this.props.user.email}/>
              </div>
              <div className="row">
                  <div className="col-xs-2" onClick={this.props.prevWeek}>
                    <i className="fa fa-lg fa-caret-left week-nav-arrow"></i>
                  </div>
                  <div className="col-xs-8 text-center">
                    <span className="week-date">{formatDay(this.props.beginningDate)} - {formatDay(this.props.endDate)}</span>
                  </div>
                  <div className="col-xs-2 text-right" onClick={this.props.nextWeek}>
                    <i className="fa fa-lg fa-caret-right week-nav-arrow"></i>
                  </div>
              </div>
            </div>
          </QuestionHeader>
          <QuestionMain absolute={true}>
            <JournalList
              journals={this.props.selectedJournals}
              singleJournalPDF={this.singleJournalPDF}
            />
            <div className="col-xs-12">
              <button className="btn nav-button next-button relative-button" onClick={this.weekPDF}>
                WOCHE HERUNTERLADEN
              </button>
            </div>
            <div className="col-xs-12">
              <button className="btn nav-button next-button relative-button" onClick={this.allJournalsPDF}>
                ALLE EINTRÄGE HERUNTERLADE
              </button>
            </div>
            <div className="logout" onClick={this.logout}>
              <span className="logout-text">ausloggen</span>
            </div>
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
