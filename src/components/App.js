import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionsDashboard from './QuestionsDashboard'
import UsersDashboard from './UsersDashboard'
import Login from './Login'
import NewQuestion from './NewQuestion'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Navbar'
import AnsweringQuestion from './AnsweringQuestion';
import QuestionResult from './QuestionResult';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  shouldComponentUpdate () {
    console.log('APP', this.props)
  }
  render () {
    return (
      <Router>
        <Fragment>
          <div className='main-container'>
            <Navbar />
            <Route path='/' exact component={QuestionsDashboard} />
            <Route path='/leaderboard' component={UsersDashboard} />
            <Route path='/new' component={NewQuestion} />
            <Route path='/login' component={Login} />
            <Route path="/answering/:id" component={AnsweringQuestion} />
            <Route path="/results/:id" component={QuestionResult} />

          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
