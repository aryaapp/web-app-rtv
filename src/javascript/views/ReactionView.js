/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import ReactionQuestion from '../components/Question/ReactionQuestion.react.js'
import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'
import PageNumber from '../components/PageNumber.react.js'

import { setReaction } from '../actions/actions'

const mapStateToProps = (state) => ({
  reaction: state.moodTracking.reaction
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateReaction: (value) => dispatch(setReaction(value)),
    prevPage: () => dispatch(routeActions.push('/tagebuch/situation')),
    nextPage: () => dispatch(routeActions.push('/tagebuch/zusammenfassung'))
  }
}

export default class ReactionView extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="partial-wrapper" key="4">
        <div className="partial-container" >
        <PageNumber page={ 5 } />
          <ReactionQuestion
            reaction={this.props.reaction}
            updateReaction={this.props.updateReaction}
          />
        </div>
        <PrevButton onClick={this.props.prevPage} />
        <NextButton onClick={this.props.nextPage} />
      </div>
    )
  }
}

ReactionView.propTypes = {
  updateReaction: PropTypes.func.isRequired,
  reaction: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionView)