/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import ResultsScreen from '../components/ResultsScreen.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'
import PageNumber from '../components/PageNumber.react.js'


import { clearDataAction } from '../actions/actions'

const mapStateToProps = (state) => ({
  feeling: state.feeling,
  body: state.body,
  thoughts: state.thoughts,
  situation: state.situation,
  reaction: state.reaction
})

const mapDispatchToProps = (dispatch) => {
  return {
    clearData: () => dispatch(clearDataAction()),
    prevPage: () => dispatch(routeActions.push('/tagebuch/reaktion')),
  }
}

class ResultsView extends Component {
  render() {
    return (
      <div className="partial-wrapper" key="5">
        <div className="partial-container" >
          <PageNumber page={ 6 } />
          <ResultsScreen
            feeling={this.props.feeling}
            body={this.props.body}
            thoughts={this.props.thoughts}
            situation={this.props.situation}
            reaction={this.props.reaction}
            clearData={this.props.clearData} />
          <PrevButton onClick={this.props.prevPage} />
        </div>
      </div>
    )
  }
}

ResultsView.propTypes = {
  clearData: PropTypes.func.isRequired,
  feeling: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  thoughts: PropTypes.array.isRequired,
  situation: PropTypes.array.isRequired,
  reaction: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsView)