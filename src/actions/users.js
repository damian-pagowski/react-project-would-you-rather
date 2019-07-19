export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_ON_ANSWERING_QUESTION =
  'UPDATE_USER_ON_ANSWERING_QUESTION'
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function updateUserOnAnsweringQuestion(user, question) {
  return {
    type: UPDATE_USER_ON_ANSWERING_QUESTION,
    question,
    user
  }
}
