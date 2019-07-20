import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionResult extends Component {
  render () {
    if (!this.props.authedUser) {
      return <Redirect to='/login' />
    }

    const question = this.props.history.location.state.question
    const optionOneValue = question.optionOne.votes.length
    const optionTwoValue = question.optionTwo.votes.length
    const optionOneLabel =
      optionOneValue !== 0
        ? (optionOneValue / (optionOneValue + optionTwoValue) * 100).toFixed(2)
        : 0
    const optionTwoLabel =
      optionTwoValue !== 0
        ? (optionTwoValue / (optionOneValue + optionTwoValue) * 100).toFixed(2)
        : 0
    return (
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-xs-3 col-sm-3 col-md-3'>
                <img
                  className='img-fluid'
                  src={question.authorAvatar}
                  alt='User Avatar'
                />
              </div>
              <div className='col-xs-6 col-sm-6 col-md-6'>
                <h6 className='card-title'>
                  {question.authorFullName} asked question:
                </h6>
                <p className='card-text'>Would you rather:</p>
                <p className='card-text'>
                  {question.optionOne.text}
                </p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow='70'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: optionOneLabel + '%' }}
                  >
                    {optionOneLabel} %
                  </div>
                </div>
                <p className='card-text'>OR</p>
                <p className='card-text'>
                  {question.optionTwo.text}
                </p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow='70'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: optionTwoLabel + '%' }}
                  >
                    {optionTwoLabel} %
                  </div>
                </div>
              </div>
              <div className='col-xs-3 col-sm-3 col-md-3' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionResult)
