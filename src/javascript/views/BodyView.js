/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'


import BodyQuestion from '../components/Question/BodyQuestion.react.js'
import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'
import PageNumber from '../components/PageNumber.react.js'

import { setBody as updateBody } from '../actions/actions'

const mapStateToProps = (state) => ({
  body: state.body
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateBody: (value) => dispatch(updateBody(value)),
    prevPage: () => dispatch(routeActions.push('/tagebuch')),
    nextPage: () => dispatch(routeActions.push('/tagebuch/gedanken'))
  }
}

export default class BodyView extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <PageNumber page={ 2 } />

          <BodyQuestion
            body={this.props.body}
            updateBody={this.props.updateBody}
          />
        </div>
        <PrevButton onClick={this.props.prevPage} />
        <NextButton onClick={this.props.nextPage} />
      </div>

    )
  }
}

BodyView.propTypes = {
  updateBody: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyView)