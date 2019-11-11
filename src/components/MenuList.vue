<template>
  <div class="menu">
    <h2 class="menu-title">
      {{ $mq === 'sm' ? 'Selecteer kamer & objecten' : 'Selecteer een kamer' }}
    </h2>
    <ul class="menu-list">
      <li
        v-for="object in objects"
        :key="object.id"
        :class="[
          'menu-list__item p-3',
          { active: object.id === activeItem.id }
        ]"
        @click="handleClick(object)"
      >
        <div class="category d-flex">
          <span>{{ object.title }}</span>
          <span class="ml-auto">{{ object.qty }} m3</span>
        </div>
        <cn-menu-item
          v-if="$mq === 'sm'"
          v-show="object.id === activeItem.id"
          :key="object.id"
          :item="object"
          @update="emitQty"
        ></cn-menu-item>
      </li>
    </ul>
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
    }
  },
  data () {
    return {
      activeItem: {}
    }
  },
  watch: {
    activeItem: 'emitItem'
  },
  methods: {
    emitItem () {
      this.$parent.activeItem = this.activeItem
    },
    emitQty (obj, value) {
      this.$parent.calculate(obj, value)
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
