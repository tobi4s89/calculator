module.exports = {
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: 'cnCalculator_[local]_[hash:base64:8]'
        }
      },
      sass: {
        data: `
          @import "@/assets/scss/_styles.scss";
        `
      }
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/calculator.js'
    }
  }
}
