import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
class UserScores extends Component {
  render () {
    return <div />
  }
}
// export default UserScores;
function mapStateToProps ({ questions, users }) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(UserScores)
