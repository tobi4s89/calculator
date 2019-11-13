module.exports = {
  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'css/calculator.css'
      }])
    }
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
          @import "@/assets/scss/_variables.scss";
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
