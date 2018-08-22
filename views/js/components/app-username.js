const AppUsername = Vue.extend({
  props: ['username'],
  template: `<small class="ml-2">
    You are <span class="text-primary">@{{ username }}</span>
  </small>`
})