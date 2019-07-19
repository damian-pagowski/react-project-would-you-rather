import React, { Component } from "react";
import User from './User'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

class UsersDashboard extends Component {
  componentDidUpdate () {
    console.log('DASHBOARD:', this.props)
  }
  render () {
    if (this.props.authedUser === null){
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <h3 className='text-center'>Top Users</h3>
        <div className='container'>
          <ul className='dashboard-list'>
            {this.props.userIds.map(id =>
              <li key={id}>
                <div>
                  <User id={id} />
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users , authedUser}) {
  return {
    userIds: Object.keys(users),
    authedUser
  }
}

export default connect(mapStateToProps)(UsersDashboard)
