const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://webwidgets.365scores.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  transpileDependencies: true,
  configureWebpack: {},
});
