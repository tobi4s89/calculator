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
          :class="setClass('p-3 d-flex', styles)"
          class="category"
        >
          <span>{{ object.title }}</span>
          <span :class="setClass('ml-auto', styles)">
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
    <div
      :class="setClass('d-flex p-3', styles)"
      class="menu-total"
    >
      <span class="menu-total__label">
        Dit heeft u nodig <i>*</i>
      </span>
      <span
        :class="setClass('ml-auto', styles)"
        class="menu-total__qty"
      >
        <strong>{{ total }}</strong> m3
      </span>
    </div>
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
