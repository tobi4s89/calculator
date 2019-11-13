<script>
export default {
  methods: {
    parseObjects (list) {
      let items = []

      list.forEach((item) => {
        item.id = item.id === undefined ? this.toKebabCase(item.title) : item.id

        if (item.qty === undefined) this.$set(item, 'qty', 0)

        item.products.forEach((product) => {
          this.$set(product, 'qty', 0)
        })

        items.push(item)
      })

      return items
    },
    setClass (classString, styles) {
      let classes = []
      let classArray = classString.split(' ')

      classArray.forEach((className) => {
        classes.push(styles[className])
      })

      return classes
    },
    toKebabCase (str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
    }
  }
}
</script>

<style scoped>

</style>
