import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionsDashboard from './QuestionsDashboard'
import UsersDashboard from './UsersDashboard'
import Login from './Login'
import NewQuestion from './NewQuestion'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import QuestionDetails from './QuestionDetails'

let that

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      that.props.authedUser && that.props.authedUser.length > 0
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
          />}
  />
class App extends Component {
  constructor (props) {
    super(props)
    that = this
  }
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render () {
    return (
      <Router>
        <Fragment>
          <div className='main-container'>
            <Navbar />
            <PrivateRoute path='/' exact component={QuestionsDashboard} />
            <PrivateRoute path='/leaderboard' component={UsersDashboard} />
            <PrivateRoute path='/add' component={NewQuestion} />
            <Route path='/login' component={Login} />
            <PrivateRoute
              path='/questions/:question_id'
              component={QuestionDetails}
            />
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App)
