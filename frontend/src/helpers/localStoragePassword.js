function getPasswords () {
  var passwords = localStorage.getItem('passwords')
  return passwords ? JSON.parse(passwords) : {}
}

export default {
  get(playlist) {
    return getPasswords()[playlist]
  },

  add(playlist, password) {
    var passwords = getPasswords()
    passwords[playlist] = password
    localStorage.setItem('passwords', JSON.stringify(passwords))
  }
}