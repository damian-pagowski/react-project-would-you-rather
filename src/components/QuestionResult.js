import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionResult extends Component {
  render () {
    if (!this.props.authedUser) {
      return <Redirect to='/login' />
    }

    const { id } = this.props.match.params
    const question = this.props.questions[id]
    const user = this.props.users[question.author]
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
    const userAnswer = this.props.users[this.props.authedUser].answers[
      question.id
    ]
    return (
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-xs-3 col-sm-3 col-md-3'>
                <img
                  className='img-fluid'
                  src={user.avatarURL}
                  alt='User Avatar'
                />
              </div>
              <div className='col-xs-6 col-sm-6 col-md-6'>
                <h6 className='card-title'>
                  {user.name} asked: Would you rather...
                </h6>
                <p className='card-text m-2'>
                  {question.optionOne.text}
                </p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow={optionOneLabel}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: optionOneLabel + '%' }}
                  >
                    {optionOneLabel} %
                  </div>
                </div>
                <span className='badge badge-light'>
                  {optionOneValue} Votes{' '}
                  {userAnswer === 'optionOne' &&
                    <span className='badge badge-success'>Your Answer</span>}
                </span>

                <p className='card-text m-2'>
                  {question.optionTwo.text}
                </p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow={optionTwoLabel}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: optionTwoLabel + '%' }}
                  >
                    {optionTwoLabel} %
                  </div>
                </div>
                <span className='badge badge-light'>
                  {optionTwoValue} Votes{' '}
                  {userAnswer === 'optionTwo' &&
                    <span className='badge badge-success'> Your Answer</span>}
                </span>
              </div>
              <div className='col-xs-3 col-sm-3 col-md-3' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps ({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(QuestionResult)
