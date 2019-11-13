import Vue from 'vue'
import VueMq from 'vue-mq'
import vSelect from 'vue-select'
import App from '@/App.vue'
import 'vue-select/dist/vue-select.css'

Vue.config.productionTip = false

// Vue Media queries
Vue.use(VueMq, {
  breakpoints: {
    sm: 768,
    md: 992,
    lg: 1200,
    xl: Infinity
  }
})

Vue.component('v-select', vSelect)

/* eslint-disable no-new */
new Vue({
  el: '#cnCalculator',
  components: { App },
  data () {
    return {
      inventory: []
    }
  },
  beforeMount () {
    const inventory = this.$el.attributes['data-inventory']
    if (inventory !== undefined) this.inventory = JSON.parse(inventory.value)
  },
  render (createElement) {
    const self = this
    return createElement(App, {
      props: {
        inventory: self.inventory
      }
    })
  }
})
