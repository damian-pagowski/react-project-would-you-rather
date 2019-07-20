import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import {
  updateUserOnCreatingQuestion,
  updateUserOnAnsweringQuestion
} from './users'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function saveAnswer ({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    user: authedUser,
    question: qid,
    answer
  }
}

export function handleSaveAnswer (params) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return saveQuestionAnswer(params)
      .then(q => {
        dispatch(saveAnswer(params))
        dispatch(updateUserOnAnsweringQuestion(params))
      })
      .then(() => dispatch(hideLoading()))
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
    dispatch(showLoading())
    return saveQuestion(question)
      .then(q => {
        dispatch(addQuestion(q))
        dispatch(updateUserOnCreatingQuestion(q.author, q))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
