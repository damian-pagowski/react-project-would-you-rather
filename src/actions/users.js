export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_ON_CREATING_QUESTION =
  'UPDATE_USER_ON_CREATING_QUESTION'
export const UPDATE_USER_ON_ANSWERING_QUESTION = 'UPDATE_USER_ON_ANSWERING_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function updateUserOnCreatingQuestion(user, question) {
  return {
    type: UPDATE_USER_ON_CREATING_QUESTION,
    question,
    user
  }
}

export function updateUserOnAnsweringQuestion({authedUser, qid, answer}){
    return {
        type: UPDATE_USER_ON_ANSWERING_QUESTION,
        user : authedUser,
        question: qid,
        answer
      }
}
