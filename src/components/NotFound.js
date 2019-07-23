import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div className='not-found'>
        <div className="text-center">
          <h3>404 page not found</h3>
          <p>This page does not exist.</p>
          <i className='fa fa-home' aria-hidden='true' />
          <Link className='button' to={'/'}>
            Main Page
          </Link>
        </div>
      </div>
    </div>
  )
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NotFound)
