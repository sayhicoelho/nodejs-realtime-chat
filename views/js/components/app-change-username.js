const AppChangeUsername = Vue.extend({
  template: `<button
    type="button"
    @click="$root.talking = false"
    class="btn btn-default mt-3 mb-3">
    change username
  </button>`
})