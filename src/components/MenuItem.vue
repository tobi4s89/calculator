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
      <ul class="menu-item__products"></ul>
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
    return {}
  }
}
</script>

<style scoped>

</style>
