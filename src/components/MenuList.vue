<template>
  <div class="menu">
    <h2 class="menu-title">
      {{ $mq === 'sm' ? 'Selecteer kamer & objecten' : 'Selecteer een kamer' }}
    </h2>
    <ul class="menu-list">
      <li
        v-for="(object, index) in items"
        :key="index"
        :class="[
          'menu-list__item',
          { active: object.id === activeItem.id }
        ]"
        @click="handleClick(object)"
      >
        <span>{{ object.title }}</span>
        <cn-menu-item
          v-if="$mq === 'sm'"
          v-show="object.id === activeItem.id"
          :item="object"
        ></cn-menu-item>
      </li>
    </ul>
  </div>
</template>

<script>
import cnMenuItem from '@/components/MenuItem.vue'

export default {
  name: 'cn-menu-list',
  props: {
    objects: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    cnMenuItem
  },
  data () {
    return {
      activeItem: {}
    }
  },
  computed: {
    items () {
      let parsedObjects = []

      this.objects.forEach((obj) => {
        let item = this.mapObjectWithId(obj)

        parsedObjects.push(item)
      })

      return parsedObjects
    }
  },
  watch: {
    activeItem: 'emitItem'
  },
  methods: {
    emitItem () {
      this.$parent.activeItem = this.activeItem
    },
    handleClick (obj) {
      this.activeItem = obj

      this.$emit('select', obj)
    },
    mapObjectWithId (obj) {
      obj.id = this.toKebabCase(obj.title)

      return obj
    },
    toKebabCase (str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
    }
  },
  mounted () {
    if (this.objects.length) {
      this.activeItem = this.mapObjectWithId(this.objects[0])
    }
  }
}
</script>
