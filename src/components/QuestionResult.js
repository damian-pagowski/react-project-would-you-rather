import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const QuestionResult = props => {
  if (!props.authedUser) {
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3'>
              <img
                className='img-fluid'
                src={props.question.authorAvatar}
                alt='User Avatar'
              />
            </div>
            <div className='col-xs-6 col-sm-6 col-md-6'>
              <h6 className='card-title'>
                {props.question.authorName} asked: Would you rather...
              </h6>
              <p className='card-text m-2'>
                {props.question.optionOne.text}
              </p>
              <div className='progress'>
                <div
                  className='progress-bar'
                  role='progressbar'
                  aria-valuenow={props.question.optionOnePercent}
                  aria-valuemin='0'
                  aria-valuemax='100'
                  style={{ width: props.question.optionOnePercent + '%' }}
                >
                  {props.question.optionOnePercent} %
                </div>
              </div>
              <span className='badge badge-light'>
                {props.question.optionOneVotes} Votes{' '}
                {props.question.userAnswer === 'optionOne' &&
                  <span className='badge badge-success'>Your Answer</span>}
              </span>

              <p className='card-text m-2'>
                {props.question.optionTwo.text}
              </p>
              <div className='progress'>
                <div
                  className='progress-bar'
                  role='progressbar'
                  aria-valuenow={props.question.optionTwoPercent}
                  aria-valuemin='0'
                  aria-valuemax='100'
                  style={{ width: props.question.optionTwoPercent + '%' }}
                >
                  {props.question.optionTwoPercent} %
                </div>
              </div>
              <span className='badge badge-light'>
                {props.question.optionTwoVotes} Votes{' '}
                {props.question.userAnswer === 'optionTwo' &&
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

function mapStateToProps ({ questions, authedUser, users }, props) {

  console.log("question results props>> ", JSON.stringify(props))
  console.log("question results >> ", Object.keys(JSON.stringify(props)))

  const id = props.id;
  const question = questions[id]
  const optionOneVotes = question && question.optionOne.votes.length
  const optionTwoVotes = question && question.optionTwo.votes.length

  const optionOnePercent =
    question && question.optionOne.votes.length > 0
      ? (questions[id].optionOne.votes.length /
          (questions[id].optionOne.votes.length +
            questions[id].optionTwo.votes.length) *
          100).toFixed(2)
      : 0
  const optionTwoPercent =
    question && question.optionTwo.votes.length > 0
      ? (questions[id].optionTwo.votes.length /
          (questions[id].optionOne.votes.length +
            questions[id].optionTwo.votes.length) *
          100).toFixed(2)
      : 0
  const author = question && users[question.author]
  const currentUser = users[authedUser]

  return {
    authedUser,
    question: {
      ...question,
      authorName: author && author.name,
      authorAvatar: author && author.avatarURL,
      userAnswer: currentUser && currentUser.answers[id],
      optionTwoPercent,
      optionOnePercent,
      optionOneVotes,
      optionTwoVotes
    }
  }
}

export default connect(mapStateToProps)(QuestionResult)
