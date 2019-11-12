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

<style lang="scss" scoped>
/deep/ {
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

  .vs__dropdown-option--highlight{
    background: $primary-color;
  }
}

.selector {
  &-content {
    text-align: center;
    color: $primary-color;
  }
  &-btn {
    display: block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .75rem .75rem;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    color: $white;
    background-color: $danger-color;
    text-decoration: none;
    text-transform: uppercase;
  }

  &-error {
    color: $danger-color;
  }
}
</style>
