const AppMain = Vue.extend({
  computed: {
    users() {
      return this.$root.users
    },
    username() {
      return this.$root.username
    },
    messages() {
      return this.$root.messages
    },
  },
  template: `<main>
    <div class="container">
      <app-users v-bind:users="users"></app-users>
      <app-change-username></app-change-username>
      <app-username v-bind:username="username"></app-username>
      <app-input></app-input>
      <app-chat v-bind:messages="messages"></app-chat>
    </div>
  </main>`
})