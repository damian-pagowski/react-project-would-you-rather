import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionsDashboard from './QuestionsDashboard'
import UsersDashboard from './UsersDashboard'
import Login from './Login'
import NewQuestion from './NewQuestion'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Navbar'
import QuestionDetails from './QuestionDetails';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render () {
    return (
      <Router>
        <Fragment>
          <div className='main-container'>
            <Navbar />
            <Route path='/' exact component={QuestionsDashboard} />
            <Route path='/leaderboard' component={UsersDashboard} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/login' component={Login} />
            {/* <Route path='/answering/:id' component={AnsweringQuestion} /> */}
            {/* <Route path='/questions/:question_id' component={QuestionResult} /> */}
            <Route path='/questions/:question_id' component={QuestionDetails} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
