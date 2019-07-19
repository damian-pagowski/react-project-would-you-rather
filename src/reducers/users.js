import {
  RECEIVE_USERS,
  UPDATE_USER_ON_ANSWERING_QUESTION
} from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case UPDATE_USER_ON_ANSWERING_QUESTION:
      const users = { ...state }
      const usersUpdated = {
        ...users,
        [action.user]: {
          ...users[action.user],
          questions: users[action.user].questions.concat([action.question.id])
        }
      }
      return {
        ...state,
        ...usersUpdated
      }

    default:
      return state
  }
}
