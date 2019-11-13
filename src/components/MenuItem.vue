<template>
  <div>
    <h2
      v-if="$mq !== 'sm'"
      class="menu-title m-0 mb-2 pb-3"
    >
      Selecteer objecten
    </h2>
    <div class="menu-item">
      <h3
        v-if="hasTitle"
        class="menu-item__title m-0 p-3"
      >
        {{ item.title }}
      </h3>
      <ul class="menu-item__products row m-0 p-0">
        <li
          v-for="(product, index) in item.products"
          :key="index"
          :class="[
            { even: isEven(item.products.length) },
            'col-12 col-lg-6 list-style-none'
          ]"
        >
          <div class="inner-item d-flex align-items-center">
            <span class="pl-3">
              {{ product.name }}
            </span>
            <div class="qty-controller d-flex justify-content-center ml-auto">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'cn-menu-item',
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
