<template>
  <div id="cnCalculator">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3">
          <cn-menu-list
            rel="menu-list"
            :objects="objects"
          />
        </div>
        <cn-menu-item
          v-if="$mq !== 'sm'"
          rel="menu-item"
          class="col-12 col-md-8 col-xl-9"
          :item="activeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cnMenuItem from '@/components/MenuItem.vue'
import cnMenuList from '@/components/MenuList.vue'
import Utilities from '@/mixins/Utilities.vue'

export default {
  name: 'calculator',
  components: {
    cnMenuItem,
    cnMenuList
  },
  mixins: [Utilities],
  props: ['inventory'],
  data () {
    return {
      activeItem: {},
      objects: []
    }
  },
  methods: {
    calculate (obj, value) {
      this.objects.map(item => {
        if (item.id === obj.id) {
          item.qty = value
        }
      })
    }
  },
  beforeMount () {
    this.objects = this.parseObjects(this.inventory.objects)
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  @import '~bootstrap/scss/bootstrap-grid';
  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}

#cnCalculator {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
