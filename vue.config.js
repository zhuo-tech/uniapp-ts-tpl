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

const name = 'smt-shiti' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 10086 npm run dev OR npm run dev --port = 10086
const port = process.env.port || process.env.npm_config_port || 10086 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: '/',
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
    // before: require('./mock/mock-server.js'),
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://gateway.zhuo-zhuo.com', // 线上测试环境
        // target: 'http://47.96.236.219:9999',   // 线上测试环境
        // target: 'http://192.168.31.159:9999',  // 俊龙本地环境
        // target: 'http://192.168.31.166:9999',     // 可可本地环境
        // target: 'http://192.168.31.119:9999',     // 谁的环境？
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
  // chainWebpack(config) {
  //   // it can improve the speed of the first screen, it is recommended to turn on preload
  //   // it can improve the speed of the first screen, it is recommended to turn on preload
  //   config.plugin('preload').tap(() => [
  //     {
  //       rel: 'preload',
  //       // to ignore runtime.js
  //       // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
  //       fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
  //       include: 'initial'
  //     }
  //   ])

  //   // when there are many pages, it will cause too many meaningless requests
  //   config.plugins.delete('prefetch')

  //   // set svg-sprite-loader
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolve('src/icons'))
  //     .end()
  //   config.module
  //     .rule('icons')
  //     .test(/\.svg$/)
  //     .include.add(resolve('src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end()

  //   config
  //     .when(process.env.NODE_ENV !== 'development',
  //       config => {
  //         config
  //           .plugin('ScriptExtHtmlWebpackPlugin')
  //           .after('html')
  //           .use('script-ext-html-webpack-plugin', [{
  //             // `runtime` must same as runtimeChunk name. default is `runtime`
  //             inline: /runtime\..*\.js$/
  //           }])
  //           .end()
  //         config
  //           .optimization.splitChunks({
  //             chunks: 'all',
  //             cacheGroups: {
  //               libs: {
  //                 name: 'chunk-libs',
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: 10,
  //                 chunks: 'initial' // only package third parties that are initially dependent
  //               },
  //               elementUI: {
  //                 name: 'chunk-elementUI', // split elementUI into a single package
  //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //               },
  //               commons: {
  //                 name: 'chunk-commons',
  //                 test: resolve('src/components'), // can customize your rules
  //                 minChunks: 3, //  minimum common number
  //                 priority: 5,
  //                 reuseExistingChunk: true
  //               }
  //             }
  //           })
  //         // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
  //         config.optimization.runtimeChunk('single')
  //       }
  //     )
  // }
}
