const AppChat = Vue.extend({
  props: ['messages'],
  template: `<ul id="chat" class="list-group">
    <app-message v-for="(message, index) in messages" v-bind:key="index"
      v-bind:sender="message.sender"
      v-bind:from="message.from"
      v-bind:to="message.to">
      {{ message.text }}
    </app-message>
  </ul>`
})