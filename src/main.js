import Vue from 'vue'
import VueMq from 'vue-mq'
import App from '@/App.vue'
import Dummy from '@/assets/data.json'

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
    // const inventory = this.$el.attributes['data-inventory']
    // if (inventory !== undefined) this.inventory = JSON.parse(inventory.value)
    this.inventory = Dummy.data
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
