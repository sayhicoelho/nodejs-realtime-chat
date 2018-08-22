Vue.component('app-chat', AppChat)
Vue.component('app-message', AppMessage)
Vue.component('app-input', AppInput)
Vue.component('app-users', AppUsers)
Vue.component('app-change-username', AppChangeUsername)
Vue.component('app-username', AppUsername)
Vue.component('app-header', AppHeader)
Vue.component('app-main', AppMain)
Vue.component('app-footer', AppFooter)
Vue.component('app-welcome', AppWelcome)

const socket = io()

const vue = new Vue({
  el: '#app',
  data: {
    talking: false,
    username: '',
    users: 0,
    messages: [ ]
  },
  created () {
    socket.on('connect', () => { })

    socket.on('disconnect', () => { })

    socket.on('message', (message, users) => {
      this.messages.unshift(message)
      this.users = users
    })
  }
})
