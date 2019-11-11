<template>
  <div>
    <h2
      v-if="$mq !== 'sm'"
      class="menu-title"
    >
      Selecteer objecten
    </h2>
    <div class="menu-item">
      <h3 class="menu-item__title">
        {{ item.title }}
      </h3>
      <ul class="menu-item__products row">
        <li
          v-for="(product, index) in item.products"
          :key="index"
          class="col-12 col-md-6 d-flex"
        >
          <span class="pl-3">
            {{ product.name }}
          </span>
          <div class="qty-controller d-flex justify-content-center ml-auto">
            <span
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
              class="qty-control__up arrow"
              @click="stepUp(product)"
            >
              +
            </span>
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

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
