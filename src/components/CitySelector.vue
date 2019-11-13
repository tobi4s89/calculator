<template>
  <div class="selector">
    <div class="selector-content my-5">
      <p>{{ content }}</p>
    </div>
    <div
      v-if="error"
      class="selector-error mb-1"
    >
      <small>{{ error }}</small>
    </div>
    <v-select
      label="city"
      :clearable="false"
      :options="locations"
      v-model="selected"
      class="selector-select mb-4"
      @input="validate"
    ></v-select>
    <a
      :href="selected.url"
      class="selector-btn"
      type="button"
      @click="validate"
    >
      {{ btnTitle }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'cn-country-selector',
  props: {
    btnTitle: {
      type: String,
      default: 'Naar vestiging'
    },
    content: {
      type: String,
      default: ''
    },
    locations: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      error: '',
      options: [],
      selected: {
        city: 'Kies vestiging',
        url: 'javascript:void(0)'
      }
    }
  },
  methods: {
    validate () {
      this.error = ''
      if (this.selected.city === 'Kies vestiging') {
        this.error = 'Selecteer een vestiging'
      }
    }
  }
}
</script>
