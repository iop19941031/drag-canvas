const commonConfig = require('./webpack.base.config.js')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const resolve = dir => path.join(__dirname, '..', dir)
// 分析项目所有包及体积大小（可视化）
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(commonConfig, {
  mode: 'development', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  devtool: 'cheap-module-eval-source-map',
  // source-map每个module生成对应的map文件
  // eval 每一个module模块执行eval，不生成map文件，在尾部生成一个sourceURL对应前后关系，所以更快
  // cheap 列信息 VLQ编码
  // module 包含了模块之间的sourcemap
  module: {
    // 配置loader
    rules: [
      {
        test: /\.js$/,
        include: resolve('src'),
        loader: 'eslint-loader',
        options: {
          fix: true
          // eslint options (if necessary)
        }
      },
      {
        test: /\.css$/,
        include: resolve('src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
              // hashPrefix: 'hash',
            }
          }, // 将 CSS 转化成 CommonJS 模块
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // include: resolve('src'),
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          {
            loader: 'css-loader',
            options: {
              odules: {
                localIdentName:
                  'FILE-[name]__ELEMENT_NAME-[local]__HASH64-[hash:base64:5]'
              }
            }
          }, // 将 CSS 转化成 CommonJS 模块
          'postcss-loader',
          'less-loader' // 将 Less 编译为 CSS
        ]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName:
                  'FILE-[name]__ELEMENT_NAME-[local]__HASH64-[hash:base64:5]'
              }
              // hashPrefix: 'hash',
            }
          }, // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'postcss-loader' // 将 Sass 编译成 CSS
          },
          {
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@@': resolve('src/assets')
    }
  },
  devServer: {
    // 配置webpack-dev-server， 在本地启动一个服务器运行
    // host: 'devw.xsteach.com', // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    port: 8088, // 端口
    open: false, // 自动打开页面
    hot: true, // 设置热更新(引用react热更新必须设置)
    historyApiFallback: true,
    proxy: {
      // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
      // 你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
      '/lottery': {
        ws: false,
        target: 'https://event.dev.xsteach.com',
        // target: '',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin() // 引入热更新插件(引用react热更新必须设置)，
  ]
})
