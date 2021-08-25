/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const path = require('path')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevision = new GitRevisionPlugin()

process.env.VUE_APP_BUILD_VERSION = gitRevision.version()
process.env.VUE_APP_BUILD_COMMITHASH = gitRevision.commithash()
process.env.VUE_APP_BUILD_BRANCH = gitRevision.branch()
process.env.VUE_APP_BUILD_TIME = `${Date.now()}`

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'App' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 10086 npm run dev OR npm run dev --port = 10086
const port = process.env.port || process.env.npm_config_port || 10086 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // uniapp 不支持 publicPath，请于 src/manifest.json:h5:router:base 中设置 @see https://uniapp.dcloud.io/collocation/manifest?id=h5-router
  // publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  outputDir: 'dist',
  assetsDir: 'src/static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
