import React from 'react'
import User from './User'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const UsersDashboard = (props) => {
  if (!props.authedUser) {
    return <Redirect to='/login' />
  }
  return (
    <div>
      <h3 className='text-center'>Top Users</h3>
      <div className='container'>
        <ul className='dashboard-list'>
          {props.formattedUsers
            .sort((a, b) => b.scores - a.scores)
            .map(user =>
              <li key={user.id}>
                <User user={user} />
              </li>
            )}
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps ({ users, authedUser }) {
  const formattedUsers = Object.values(
    users
  ).map(({ id, name, questions, answers, avatarURL }) => ({
    id,
    name,
    questions: Object.keys(questions).length,
    answers: Object.keys(answers).length,
    scores: Object.keys(questions).length + Object.keys(answers).length,
    avatarURL
  }))

  return {
    formattedUsers,
    authedUser
  }
}

export default connect(mapStateToProps)(UsersDashboard)
