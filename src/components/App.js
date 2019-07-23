import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionsDashboard from './QuestionsDashboard'
import UsersDashboard from './UsersDashboard'
import Login from './Login'
import NewQuestion from './NewQuestion'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Navbar from './Navbar'
import QuestionDetails from './QuestionDetails'
import NotFound from './NotFound'
import { isSessionAuthenticated } from '../utils/fakeAuth'
const context = {}

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isSessionAuthenticated()
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
    context.that = this
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
            <Switch>
              <PrivateRoute path='/' exact component={QuestionsDashboard} />
              <PrivateRoute
                path='/leaderboard'
                exact
                component={UsersDashboard}
              />
              <PrivateRoute path='/add' exact component={NewQuestion} />
              <Route path='/login' exact component={Login} />
              <PrivateRoute
                path='/questions/:question_id'
                component={QuestionDetails}
              />
              <PrivateRoute path='/error-404' component={NotFound} />
              <PrivateRoute component={NotFound} />
            </Switch>
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
