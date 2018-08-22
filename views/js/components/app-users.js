const AppUsers = Vue.extend({
  props: ['users'],
  template: `<small class="float-right">
    Users connected: {{ users }}
  </small>`
})