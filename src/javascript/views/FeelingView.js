/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import FeelingQuestion from '../components/Question/FeelingQuestion.react.js'
import NextButton from '../components/Reusable/NextButton.react.js'
import { setFeeling as updateFeeling } from '../actions/actions'
import PageNumber from '../components/PageNumber.react.js'


const mapStateToProps = (state) => ({
  feeling: state.moodTracking.feeling
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateFeeling: (value) => dispatch(updateFeeling(value)),
    nextPage: () => dispatch(routeActions.push('/tagebuch/koerper'))
  }
}

export default class FeelingView extends Component {
  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container">
          <PageNumber page={ 1 } />
          <FeelingQuestion
             feeling={this.props.feeling}
             updateFeeling={this.props.updateFeeling}
          />
        </div>
        <NextButton onClick={this.props.nextPage} />
      </div>
    )
  }
}

FeelingView.propTypes = {
  updateFeeling: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  feeling: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FeelingView)