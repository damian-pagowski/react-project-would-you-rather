import React from 'react'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import AnsweringQuestion from './AnsweringQuestion'
import { Redirect } from 'react-router-dom'

const QuestionDetails = props => {
  if (!props.isQuestionIdValid) {
    return (
      <Redirect
        to={{
          pathname: '/error-404'
        }}
      />
    )
  } else {
    const componentToDisplay = props.isAnswered
      ? <QuestionResult id={props.id} />
      : <AnsweringQuestion id={props.id} />
    return (
      <div>
        {componentToDisplay}
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser, questions }, props) {
  const id = props.match.params.question_id
  const currentUser = users[authedUser]
  const isQuestionIdValid = questions && Object.keys(questions).includes(id)
  const isAnswered =
    isQuestionIdValid && Object.keys(currentUser.answers).includes(id)
  return {
    isAnswered: isAnswered,
    authedUser,
    id,
    isQuestionIdValid: isQuestionIdValid
  }
}

export default connect(mapStateToProps)(QuestionDetails)
