<template>
  <div id="cnCalculator">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
          <cn-menu-list
            rel="menu-list"
            :objects="objects"
            :total="total"
          >
            <cn-city-selector
              slot="additional"
              :content="content"
              :locations="locations"
            />
          </cn-menu-list>
        </div>
        <cn-menu-item
          v-if="$mq !== 'sm'"
          rel="menu-item"
          class="col-12 col-md-6 col-lg-8"
          :item="activeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cnCitySelector from '@/components/CitySelector.vue'
import cnMenuItem from '@/components/MenuItem.vue'
import cnMenuList from '@/components/MenuList.vue'
import Utilities from '@/mixins/Utilities.vue'

export default {
  name: 'calculator',
  components: {
    cnCitySelector,
    cnMenuItem,
    cnMenuList
  },
  mixins: [Utilities],
  props: ['inventory'],
  data () {
    return {
      activeItem: {},
      content: '',
      locations: [],
      objects: [],
      total: 0
    }
  },
  methods: {
    calculate (items) {
      this.total = 0
      items.forEach(item => {
        this.total += item.qty
      })
    }
  },
  beforeMount () {
    this.content = this.inventory.citySelectText
    this.objects = this.parseObjects(this.inventory.objects)
    this.locations = this.inventory.locations
  }
}
</script>

<style lang="scss" scoped>
#cnCalculator {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/deep/ {
  @import '~bootstrap/scss/bootstrap-grid';
  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
