/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'


import SituationQuestion from '../components/Question/SituationQuestion.react.js'
import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'
import PageNumber from '../components/PageNumber.react.js'

import { setSituation } from '../actions/actions'

const mapStateToProps = (state) => ({
  situation: state.situation
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateSituation: (value) => dispatch(setSituation(value)),
    prevPage: () => dispatch(pushPath('/thoughts')),
    nextPage: () => dispatch(pushPath('/reaction'))
  }
}

export default class SituationView extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="partial-wrapper" key="3">
        <div className="partial-container" >
          <PageNumber page={ 4 } />
          <SituationQuestion
            situation={this.props.situation}
            updateSituation={this.props.updateSituation}
          />
        </div>
        <PrevButton onClick={this.props.prevPage} />
        <NextButton onClick={this.props.nextPage} />
      </div>
    )
  }
}

SituationView.propTypes = {
  updateSituation: PropTypes.func.isRequired,
  situation: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SituationView)