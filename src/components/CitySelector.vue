<template>
  <div class="selector">
    <div
      :class="setClass('my-5', styles)"
      class="selector-content">
      <p>{{ content }}</p>
    </div>
    <div
      v-if="error"
      :class="setClass('mb-1', styles)"
      class="selector-error"
    >
      <small>{{ error }}</small>
    </div>
    <v-select
      label="city"
      :clearable="false"
      :options="locations"
      :class="setClass('mb-4', styles)"
      v-model="selected"
      class="selector-select"
      @input="validate"
    ></v-select>
    <a
      :href="selected.url"
      :target="selected.city !== 'Kies vestiging' ? '_blank' : ''"
      class="selector-btn"
      type="button"
      @click="validate"
    >
      {{ btnTitle }}
    </a>
  </div>
</template>

<script>
import Utilities from '@/mixins/Utilities.vue'

export default {
  name: 'cn-country-selector',
  mixins: [Utilities],
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
    },
    styles: {
      type: Object,
      default () {
        return {}
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

<style lang="scss" scoped>
// CitySelector
/deep/ {
  @import '~vue-select/src/scss/vue-select.scss';

  .v-select {
    cursor: pointer !important;
  }

  .vs__dropdown-toggle {
    border-radius: 0;
    border-color: $primary-color;
    background: $light-grey;
    cursor: pointer !important;
    padding: 5px 0 10px 5px;

    .vs__search,
    .vs__search:focus {
      cursor: pointer !important;
    }

    .vs__actions {
      padding: 4px 16px 0 3px;
    }

    .vs__selected {
      text-transform: uppercase;
      color: $primary-color;
      font-size: .875rem;
    }
  }

  .vs__dropdown-option--highlight {
    background: $primary-color;
  }
}
</style>
