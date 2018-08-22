const AppMessage = Vue.extend({
  props: ['sender', 'to'],
  template: `<li class="list-group-item" v-bind:class="{ private: to == $root.username }">
    <em>{{ sender }}</em>:
    <strong
      v-if="to"
      class="text-primary">
      @{{ to }}
    </strong>
    <slot/>
  </li>`
})