export function isSessionAuthenticated() {
  return getCookie('username').trim().length > 0
}

export function getAuthenticatedUser () {
  return getCookie('username')
}

export function logout () {
  deleteCookie('username')
}

export function login (username) {
  setCookie('username', username, 1)
}

function setCookie (cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function deleteCookie (cname) {
  document.cookie = cname + '=;expires=Wed; 01 Jan 1970'
}

function getCookie (cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
