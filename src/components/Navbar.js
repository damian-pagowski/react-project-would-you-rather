import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleLogout } from '../actions/authedUser'

const handleSignOut = (e, props) => {
  e.preventDefault()
  const { dispatch } = props
  dispatch(handleLogout()); 
}

const Navbar = props => {
  const loggedUserData = props.loginData

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light'>
      <button className='navbar-brand button-link'>
        <i className='fa fa-gamepad' />
      </button>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <NavLink className='nav-link' to='/' exact>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/add' exact>
              Add Question
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/leaderboard' exact>
              Leader Board
            </NavLink>
          </li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li className='nav-item'>
            <div className='nav-link username'>
              <i className='fa fa-user' /> {loggedUserData.display}
            </div>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link button-link'
              onClick={e => handleSignOut(e, props)}
            >
              <i className='fa fa-sign-out' /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

function mapStateToProps ({ users, authedUser }) {
  const currentUser = authedUser !== null ? users[authedUser] : null
  const loginData = {
    display: currentUser ? currentUser.name : null
  }

  return {
    loginData: loginData
  }
}

export default connect(mapStateToProps)(Navbar)
