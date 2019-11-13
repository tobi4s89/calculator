<template>
  <div id="cnCalculator">
    <div :class="setClass('container', $style)">
      <div :class="setClass('row', $style)">
        <div :class="setClass('col-12 col-md-6 col-lg-4', $style)">
          <cn-menu-list
            rel="menu-list"
            :objects="objects"
            :styles="$style"
            :total="total"
          >
            <cn-city-selector
              slot="additional"
              :content="content"
              :locations="locations"
              :styles="$style"
            />
          </cn-menu-list>
        </div>
        <cn-menu-item
            v-if="$mq !== 'sm'"
            rel="menu-item"
            :class="setClass('col-12 col-md-6 col-lg-8', $style)"
            :item="activeItem"
            :styles="$style"
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
  mounted () {
    this.content = this.inventory.citySelectText
    this.objects = this.parseObjects(this.inventory.objects)
    this.locations = this.inventory.locations
  }
}
</script>

<style lang="scss" module>
  @import '~bootstrap/scss/bootstrap-grid';
</style>

<style lang="scss">
html {
  box-sizing: content-box;
  -webkit-box-sizing: content-box;
}
#cnCalculator {
  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .menu-title {
    text-align: center;
    font-size: 1.3rem;
    color: $primary-color;
    border-bottom: 1px solid $primary-color;
  }

  .list-style-none {
    list-style: none !important;
  }

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @import './assets/scss/styles.scss';
}
</style>
