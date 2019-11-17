<template>
  <div class="menu">
    <h2
      :class="setClass('m-0 mb-2 pb-3', styles)"
      class="menu-title"
    >
      {{ $mq === 'sm' ? 'Selecteer kamer & objecten' : 'Selecteer een kamer' }}
    </h2>
    <ul
      :class="setClass('m-0 mb-3 p-0', styles)"
      class="menu-list"
    >
      <li
        v-for="object in objects"
        :key="object.id"
        :class="[
          'menu-list__item list-style-none',
          { active: object.id === activeItem.id }
        ]"
        @click="activate(object)"
      >
        <div
          :class="setClass('mb-2 p-3 d-flex justify-content-right align-items-center', styles)"
          class="category"
        >
          <span :class="setClass('mr-auto', styles)">{{ object.title }}</span>
          <span>
            <strong>{{ Math.round(object.qty * 100) / 100 }}</strong> m3
          </span>
          <span
            :class="setClass('d-md-none ml-3', styles)"
            class="toggle">{{ object.id === activeItem.id ? '-' : '+' }}</span>
        </div>
        <cn-menu-item
          v-if="$mq === 'sm'"
          v-show="object.id === activeItem.id"
          :has-title="false"
          :key="object.id"
          :item="object"
          :styles="styles"
        ></cn-menu-item>
      </li>
      <div
        :class="setClass('d-flex p-3 my-3', styles)"
        class="menu-total"
      >
      <span class="menu-total__label">
        Dit heeft u nodig <i>*</i>
      </span>
        <span
          :class="setClass('ml-auto', styles)"
          class="menu-total__qty"
        >
        <strong>{{ Math.round(total * 100) / 100 }}</strong> m3
      </span>
      </div>
    </ul>

    <slot name="additional" />
  </div>
</template>

<script>
import cnMenuItem from '@/components/MenuItem.vue'
import Utilities from '@/mixins/Utilities.vue'

export default {
  name: 'cn-menu-list',
  components: {
    cnMenuItem
  },
  mixins: [Utilities],
  props: {
    objects: {
      type: Array,
      default () {
        return []
      }
    },
    styles: {
      type: Object,
      default () {
        return {}
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
        if (JSON.stringify(this.activeItem) === '{}') {
          this.activate(value[0])
        }
        this.$parent.calculate(value)
      },
      deep: true
    }
  },
  methods: {
    activate (obj) {
      this.activeItem = obj
    },
    emitItem () {
      this.$parent.activeItem = this.activeItem
    }
  },
  mounted () {
    if (this.objects.length) {
      this.activeItem = this.objects[0]
    }
  }
}
</script>
