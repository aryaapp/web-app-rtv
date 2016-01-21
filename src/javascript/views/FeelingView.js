/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

import FeelingQuestion from '../components/Question/FeelingQuestion.react.js'
import NextButton from '../components/Reusable/NextButton.react.js'
import { setFeeling as updateFeeling } from '../actions/actions'
import PageNumber from '../components/PageNumber.react.js'


const mapStateToProps = (state) => ({
  feeling: state.feeling
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateFeeling: (value) => dispatch(updateFeeling(value)),
    nextPage: () => dispatch(pushPath('/body'))
  }
}

export default class FeelingView extends Component {
  createPDF() {
    let app = $('#main-app')
    let cachedWidth = app.width()
    let doc = new jsPDF({ format:'a4' })
    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };
    // this.getCanvas().then((canvas) => {
    //   let img = canvas.toDataURL("image/png")
    //   let doc = new jsPDF({ format:'a4' })
    //   doc.text(20, 20, 'Hello world!')
    //   doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
    //   doc.addImage(img, 'JPEG', 20, 20)


    //   doc.save('techumber-html-to-pdf.pdf')
    //   app.width(cachedWidth)
    // })
    doc.fromHTML(app.get(0), 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
    }, (e) => console.log(e))
    doc.save('techumber-html-to-pdf.pdf')
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container">
          <PageNumber page={ 1 } />
          <button className="test-button" onClick={this.createPDF}>
            <span className="btn-text">create pdf</span>
          </button>
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