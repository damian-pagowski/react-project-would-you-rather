// import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { updateUserOnAnsweringQuestion } from './users'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function saveAnswer (users, questions) {
  return {
    type: SAVE_ANSWER,
    users,
    questions
  }
}

export function handleSaveAnswer (authedUser, qid, answer) {
  return (dispatch, getState) => {
    return saveQuestionAnswer(authedUser, qid, answer).then((u, q) =>
      dispatch(saveAnswer(u, q))
    )
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

    return saveQuestion(question).then((q) => {
      console.log("handleAddQuestion >>>>>>", JSON.stringify(q))
      dispatch(addQuestion(q))
      dispatch(updateUserOnAnsweringQuestion(q.author, q))
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
