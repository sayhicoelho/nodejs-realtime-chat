const AppInput = Vue.extend({
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.message.length > 1) {
        const sender = this.$root.username
        let text = this.message
        let to = null

        if (this.message.charAt(0) == '@') {
          to = this.message.split(' ')[0].replace('@', '')
          text = this.message.substr(this.message.indexOf(' ') + 1)
        }

        socket.emit('message', { sender, to, text })

        this.message = ''
      }
    }
  },
  mounted() {
    this.$refs.message.focus()
  },
  template: `<div class="input-group mb-3">
    <input ref="message" v-model="message" @keydown.enter="sendMessage" placeholder="@username hello!" type="text" id="message" class="form-control">
    <div class="input-group-append">
      <button @click="sendMessage" type="button" id="btn-send-message" class="btn btn-primary">send</button>
    </div>
  </div>`
})