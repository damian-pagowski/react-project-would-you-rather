import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render () {
    const user = this.props.user
    console.log('User:', user)

    return (
      <div className='row'>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="well well-sm">
              <div className="row">
                  <div className="col-sm-6 col-md-4">
                      <img src={user.avatar} alt="" className="img-rounded img-responsive" />
                  </div>
                  <div className="col-sm-6 col-md-8">
                      <h4>{user.name}</h4>

                      <p>
                          <i className="fa fa-question"></i><span> Answered Questions: </span><span>{user.answers}</span>
                          <br />
                          <i className="fa fa-question"></i><span> Created Questions: </span><span>{user.questions}</span>
                          <br/>
                          <i className="fa fa-star"></i><span> Scores: </span><span>{user.scores}</span>
                          <br />
                          </p>

                  </div>
              </div>
          </div>
      </div>
      </div>
    )
  }
}
function mapStateToProps ({ questions, users }, { id }) {
  const user = users[id]
  const formattedUser =  user !== null? Object.assign(
    {},
    { name: user.name },
    { questions: Object.keys(user.questions).length },
    { answers: Object.keys(user.answers).length },
    {
      scores:
        Object.keys(user.questions).length + Object.keys(user.answers).length
    },
    { avatar: user.avatarURL }
  ) : null


  return {
    user: formattedUser
  }
}

export default connect(mapStateToProps)(User)
