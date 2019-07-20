// import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import {
  updateUserOnCreatingQuestion,
  updateUserOnAnsweringQuestion
} from './users'
import { _saveQuestionAnswer } from '../utils/_DATA'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function saveAnswer ({authedUser, qid, answer}) {
  return {
    type: SAVE_ANSWER,
    user : authedUser,
    question: qid,
    answer
  }
}

export function handleSaveAnswer (params) {
  return (dispatch, getState) => {
    console.log('>>>handleSaveAnswer?>>> ', JSON.stringify(params))
    return saveQuestionAnswer(params)
      .then(q => {
        dispatch(saveAnswer(params))
        dispatch(updateUserOnAnsweringQuestion(params))
      })
      .catch(e => console.log(e))
    // .then(() => dispatch(hideLoading()))
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {
    // dispatch(showLoading())

    return saveQuestion(question).then(q => {
      console.log('handleAddQuestion >>>>>>', JSON.stringify(q))
      dispatch(addQuestion(q))
      dispatch(updateUserOnCreatingQuestion(q.author, q))
    })
    // .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
