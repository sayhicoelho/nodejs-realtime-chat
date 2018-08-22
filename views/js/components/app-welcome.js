const AppWelcome = Vue.extend({
  data() {
    return {
      username: null
    }
  },
  methods: {
    setUsername() {
      this.username = this.username.split(' ').join('').toLowerCase()

      if (this.username.length > 2) {
        if (!this.$root.username) {
          socket.emit('addUser', this.username)
        }
        else {
          socket.emit('changeUsername', this.$root.username, this.username)
        }

        this.$root.username = this.username
        this.$root.talking = true
      }
    }
  },
  mounted() {
    this.username = this.$root.username
    this.$refs.username.focus()
  },
  template: `<div class="container">
    <h4 class="mt-3 mb-3 text-center">Welcome to my Node.js & Socket.io chat!</h4>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <input ref="username" v-model="username" @keydown.enter="setUsername" class="form-control mb-3">
        <button @click="setUsername" type="button" class="btn btn-block btn-primary">enter</button>
      </div>
    </div>
  </div>`
})