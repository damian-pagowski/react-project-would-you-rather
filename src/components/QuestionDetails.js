import React from 'react'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import AnsweringQuestion from './AnsweringQuestion'

const QuestionDetails = props => {
  const componentToDisplay = props.isAnswered
    ? <QuestionResult id={props.id} />
    : <AnsweringQuestion id={props.id} />

  return (
    <div>
      {componentToDisplay}
    </div>
  )
}

function mapStateToProps ({ users, authedUser }, props) {
  const id = props.match.params.question_id
  const currentUser = users[authedUser]
  const isAnswered =
    currentUser && Object.keys(currentUser.answers).includes(id)

  return {
    isAnswered: isAnswered,
    authedUser,
    id
  }
}

export default connect(mapStateToProps)(QuestionDetails)
