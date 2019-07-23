import { SET_AUTHED_USER, LOGOUT } from '../actions/authedUser'
import {
  isSessionAuthenticated,
  getAuthenticatedUser
} from '../utils/fakeAuth'

export const UNAUTHORIZED = 'unauthorized'
export default function authedUser (
  state = isSessionAuthenticated() ? getAuthenticatedUser() : UNAUTHORIZED,
  action
) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    case LOGOUT:
      return UNAUTHORIZED
    default:
      return state
  }
}
