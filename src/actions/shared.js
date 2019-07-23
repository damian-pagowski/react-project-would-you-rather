import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { getAuthenticatedUser } from '../utils/fakeAuth'

export function handleInitialData () {
  return dispatch => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(setAuthedUser(getAuthenticatedUser())
      )
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(hideLoading())
    })
  }
}
