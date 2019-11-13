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
    loaderOptions: {
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
