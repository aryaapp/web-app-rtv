/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

import ThoughtsQuestion from '../components/Question/ThoughtsQuestion.react.js'
import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'
import { setThoughts as updateThoughts } from '../actions/actions'
import PageNumber from '../components/PageNumber.react.js'

const mapStateToProps = (state) => ({
  thoughts: state.thoughts
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateThoughts: (value) => dispatch(updateThoughts(value)),
    prevPage: () => dispatch(pushPath('/body')),
    nextPage: () => dispatch(pushPath('/situation'))
  }
}

export default class ThoughtsView extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="partial-wrapper" key="2">
        <div className="partial-container" >
          <PageNumber page={ 3 } />
          <ThoughtsQuestion
            thoughts={this.props.thoughts}
            updateThoughts={this.props.updateThoughts}
          />
        </div>
        <PrevButton onClick={this.props.prevPage} />
        <NextButton onClick={this.props.nextPage} />
      </div>
    )
  }
}

ThoughtsView.propTypes = {
  updateThoughts: PropTypes.func.isRequired,
  thoughts: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThoughtsView)