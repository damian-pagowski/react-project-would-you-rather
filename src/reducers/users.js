import {
  RECEIVE_USERS,
  UPDATE_USER_ON_CREATING_QUESTION,
  UPDATE_USER_ON_ANSWERING_QUESTION
} from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case UPDATE_USER_ON_CREATING_QUESTION:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          questions: state[action.user].questions.concat([action.question.id])
        }
      }

    case UPDATE_USER_ON_ANSWERING_QUESTION:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: {
            ...state[action.user].answers,
            [action.question]: action.answer
          }
        }
      }

    default:
      return state
  }
}
