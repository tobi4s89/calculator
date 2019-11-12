<template>
  <div class="menu">
    <h2 class="menu-title m-0 mb-2 pb-3">
      {{ $mq === 'sm' ? 'Selecteer kamer & objecten' : 'Selecteer een kamer' }}
    </h2>
    <ul class="menu-list test m-0 mb-3 p-0">
      <li
        v-for="object in objects"
        :key="object.id"
        :class="[
          'menu-list__item list-style-none m-0 mb-2',
          { active: object.id === activeItem.id }
        ]"
        @click="handleClick(object)"
      >
        <div class="category p-3 d-flex">
          <span>{{ object.title }}</span>
          <span class="ml-auto">
            <strong>{{ object.qty }}</strong> m3
          </span>
        </div>
        <cn-menu-item
          v-if="$mq === 'sm'"
          v-show="object.id === activeItem.id"
          :has-title="false"
          :key="object.id"
          :item="object"
        ></cn-menu-item>
      </li>
    </ul>
    <div class="menu-total d-flex p-3">
      <span class="menu-total__label">
        Dit heeft nu nodig <i>*</i>
      </span>
      <span class="menu-total__qty ml-auto">
        <strong>{{ total }}</strong> m3
      </span>
    </div>
    <slot name="additional" />
  </div>
</template>

<script>
import cnMenuItem from '@/components/MenuItem.vue'

export default {
  name: 'cn-menu-list',
  components: {
    cnMenuItem
  },
  props: {
    objects: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      activeItem: {}
    }
  },
  watch: {
    activeItem: 'emitItem',
    objects: {
      handler (value) {
        this.$parent.calculate(value)
      },
      deep: true
    }
  },
  methods: {
    emitItem () {
      this.$parent.activeItem = this.activeItem
    },
    handleClick (obj) {
      this.activeItem = obj
    }
  },
  mounted () {
    if (this.objects.length) {
      this.activeItem = this.objects[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  &-list {
    &__item {
      .category {
        cursor: pointer;
        background-color: $light-grey;
        color: $primary-color;

        > span:first-of-type {
          font-size: 1rem;
          text-transform: uppercase;
        }
      }

      &.active {
        .category {
          background-color: $primary-color;
          color: $white;
        }
      }
    }
  }

  &-total {
    color: $danger-color;

    &__label {
      i {
        color: $black;
      }
    }
  }
}
</style>
