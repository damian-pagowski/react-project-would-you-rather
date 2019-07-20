import React, { Component } from 'react'

class User extends Component {
  render () {
    const { user } = this.props

    return (
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3'>
              <img className='img-fluid' src={user.avatar} alt='Avatar' />
            </div>
            <div className='col-xs-6 col-sm-6 col-md-6'>
              <h6 className='card-title'>
                {user.name}
              </h6>
              <p className='card-text'>
                <i className='fa fa-question' />
                <span> Answered Questions: </span>
                <span>
                  {user.answers}
                </span>
                <br />
                <i className='fa fa-question' />
                <span> Created Questions: </span>
                <span>
                  {user.questions}
                </span>
                <br />
                <i className='fa fa-star' />
                <span> Scores: </span>
                <span>
                  {user.scores}
                </span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User
