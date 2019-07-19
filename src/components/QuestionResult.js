import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionResult extends Component {
  render () {
    const question = this.props.question
    console.log('Question:', question)

    return (<p>result!</p>)
  }
}
export default QuestionResult