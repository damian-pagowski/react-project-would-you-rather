import React, { Component } from 'react'
import User from './User'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class UsersDashboard extends Component {

  render () {
    if (!this.props.authedUser) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <h3 className='text-center'>Top Users</h3>
        <div className='container'>
          <ul className='dashboard-list'>
            {this.props.formattedUsers.sort((a,b) => b.scores - a.scores).map(user =>
              <User user={user}/>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  const formattedUsers = Object.values(users).map(user =>
    Object.assign(
      {},
      { id: user.id },
      { name: user.name },
      { questions: Object.keys(user.questions).length },
      { answers: Object.keys(user.answers).length },
      {
        scores:
          Object.keys(user.questions).length + Object.keys(user.answers).length
      },
      { avatar: user.avatarURL }
    )
  )

  return {
    formattedUsers,
    authedUser
  }
}

export default connect(mapStateToProps)(UsersDashboard)
