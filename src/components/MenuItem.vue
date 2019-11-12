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
            'col-12 col-md-6 list-style-none'
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

<style lang="scss" scoped>
input[type=number],
input[type=number]{
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &:active,
  &:focus {
    outline: none;
  }
}
.menu {
  &-item {

    @media only screen and (min-width: 768px) {
      border: 1px solid $primary-color;
    }

    &__title {
      color: white;
      text-transform: uppercase;
      font-weight: 300;
      background-color: $primary-color;
      font-size: 1rem;
    }

    &__products {
      > li {
        padding-left: 0;
        padding-right: 0;

        .inner-item {
          padding: 15px 10px 15px 25px;
          border-bottom: 1px solid $primary-color;
          color: $primary-color;
        }

        &:nth-last-child(1) {
          .inner-item {
            border-bottom: 0;
          }
        }

        @media only screen and (min-width: 768px) {
          &:nth-child(even) {
            padding-left: 8px;
          }

          &:nth-child(odd) {
            padding-right: 8px;
          }

          &.even:nth-last-child(2) {
            .inner-item {
              border-bottom: 0;
            }
          }
        }
      }

      span[type="button"] {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        font-weight: bold;
        display: block;
        cursor: pointer;
        padding: 2px 8px;
        min-width: 25px;
        background-color: $light-grey;
        font-size: 1rem;
      }
    }
  }
}
</style>
