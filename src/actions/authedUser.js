import { login, logout } from '../utils/fakeAuth'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT = 'LOGOUT'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function signOut () {
  return {
    type: LOGOUT
  }
}

export function handleLogout () {
  return dispatch => {
    dispatch(signOut())
    logout()
  }
}

export function handleLogin (username) {
  return dispatch => {
    dispatch(setAuthedUser(username))
    login(username)
  }
}
