/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import ReactSlider from 'rc-slider'

import { executeLoadJournals } from '../actions/journals'
import { clearAndLogout } from '../actions/login'
import { nextWeek, prevWeek, setJournalsForPdf, displayJournalsForWeek } from '../actions/homeView'

import { formatDay, getSunday, journalSorter } from '../utilities'
import { first, map, isEmpty } from 'lodash'
import journalSelector from '../selectors/journalSelector'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'
import JournalList from '../components/JournalList'
import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'
import ConfirmationModal from '../components/ConfirmationModal.react.js'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    beginningDate: state.homeView.beginningDate,
    endDate: getSunday(state.homeView.beginningDate),
    selectedJournals: journalSelector(state),
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
    prevWeek: () => dispatch(prevWeek()),
    nextWeek: () => dispatch(nextWeek()),
    displayJournalsForWeek: (date) => dispatch(displayJournalsForWeek(date))

  }
}

class HomeView extends Component {
  constructor(props) {
    super(props)

    //confirmation modal state
    this.state = {
      isOpen: false
    }

    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.singleJournalPDF = this.singleJournalPDF.bind(this)
    this.weekPDF = this.weekPDF.bind(this)
    this.allJournalsPDF = this.allJournalsPDF.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    if(isEmpty(this.props.journals)) {
      this.props.executeLoadJournals();
    } else {
      let latestJournal = first(this.props.journals)
      this.props.displayJournalsForWeek(new Date(latestJournal.created_at))
    }
  }

  singleJournalPDF(journal) {
    let journal_ids = [journal.id]
    this.props.setJournalsForPdf(journal_ids)
    this.props.navPrint()
  }

  weekPDF() {
    let journal_ids = map(this.props.selectedJournals, (j) => j.id)
    this.props.setJournalsForPdf(journal_ids)
    this.props.navPrint()
  }

  allJournalsPDF() {
    let journal_ids = map(this.props.journals, (j) => j.id)

    this.props.setJournalsForPdf(journal_ids)
    this.props.navPrint()
  }

  logout() {
    this.closeModal()
    this.props.logout()
    this.props.navStart()
  }
  openModal() {
      this.setState({ isOpen: true })
  }
  closeModal() {
      this.setState({ isOpen: false })
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
              <div className="row week-navigator">
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
              <button className="btn btn-ghost nav-button next-button relative-button" onClick={this.weekPDF}>
                WOCHE HERUNTERLADEN
              </button>
            </div>
            <div className="col-xs-12">
              <button className="btn btn-ghost nav-button next-button relative-button" onClick={this.allJournalsPDF}>
                ALLE EINTRÄGE HERUNTERLADE
              </button>
            </div>
          </QuestionMain>
          <FixedSectionFooter>
          <div className="col-xs-12">
            <button className="btn nav-button btn-primary relative-button" onClick={this.props.navMoodTracking}>
              <span className="btn-text">Neuer Eintrag</span>
            </button>
          </div>
          </FixedSectionFooter>
          <div className="logout-button" onClick={this.openModal} title="Ausloggen">
            <i className="fa fa-lg fa-sign-out"></i>
          </div>
        </div>
        <ConfirmationModal onClick={this.logout} isOpen={this.state.isOpen} />
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
