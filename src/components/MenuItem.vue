<template>
  <div>
    <h2
      v-if="$mq !== 'sm'"
      :class="setClass('m-0 mb-2 pb-3', styles)"
      class="menu-title"
    >
      Selecteer objecten
    </h2>
    <div class="menu-item">
      <h3
        v-if="hasTitle"
        :class="setClass('m-0 p-3', styles)"
        class="menu-item__title"
      >
        {{ item.title }}
      </h3>
      <ul
        :class="setClass('row m-0 p-0', styles)"
        class="menu-item__products"
      >
        <li
          v-for="(product, index) in item.products"
          :key="index"
          :class="[
            setClass('col-12 col-lg-6', styles),
            { even: isEven(item.products.length) },
            'list-style-none'
          ]"
        >
          <div
            :class="setClass('d-flex align-items-center', styles)"
            class="inner-item"
          >
            <span :class="setClass('pl-1 pl-md-3', styles)">
              {{ product.name }}
            </span>
            <div
              :class="setClass('d-flex justify-content-center ml-auto', styles)"
              class="qty-controller"
            >
              <span
                type="button"
                class="qty-control__down arrow"
                @click="stepDown(product)"
              >
                -
              </span>
              <input
                v-model="product.qty"
                :max="max"
                :min="min"
                :step="step"
                onkeydown="return false"
                type="number"
                @change="setQty"
              >
              <span
                type="button"
                class="qty-control__up arrow"
                @click="stepUp(product)"
              >
                +
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="close"
        :class="setClass('d-md-none my-3 pr-3', styles)"
        @click="closeThis"
      >
        <i>sluit deze kamer X</i>
      </div>
    </div>
  </div>
</template>

<script>
import Utilities from '@/mixins/Utilities.vue'

export default {
  name: 'cn-menu-item',
  mixins: [Utilities],
  props: {
    hasTitle: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      max: 100,
      min: 0,
      step: 1,
      total: 0
    }
  },
  watch: {
    item: {
      handler: 'setQty',
      deep: true
    }
  },
  methods: {
    closeThis () {
      setTimeout(() => {
        this.$parent.activeItem = {}
      }, 50)
    },
    isEven (n) {
      return n % 2 === 0
    },
    setQty () {
      this.total = 0

      this.item.products.forEach(product => {
        this.total += (parseInt(product.qty) * product.attributes.m3)
      })

      this.$set(this.item, 'qty', this.total)
    },
    stepDown (product) {
      if (product.qty > this.min) {
        this.$set(product, 'qty', product.qty - this.step)
      }
    },
    stepUp (product) {
      if (product.qty < this.max) {
        this.$set(product, 'qty', product.qty + this.step)
      }
    }
  }
}
</script>
