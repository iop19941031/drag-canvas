const commonConfig = require('./webpack.base.config.js')
const resolve = dir => path.join(__dirname, '..', dir)
const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(commonConfig, {
  mode: 'production', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  module: {
    // 配置loader
    rules: [
      {
        test: /\.css$/,
        include: resolve('src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
          {
            loader: 'css-loader',
            options: {
              odules: {
                localIdentName: '[local]--[hash:base64]'
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64]'
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
  output: {
    filename: '[name][hash].js', // 生成的js文件的名字
    path: path.resolve(__dirname, '..', 'dist/708') // 生成的js存放目录
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all", //可填 async, initial, all. 顾名思义，async针对异步加载的chunk做切割
  //     minSize: 30000, //我们切割完要生成的新chunk要>30kb，否则不生成新chunk。
  //     minChunks: 2, //共享该module的最小chunk数
  //     maxAsyncRequests: 5, //最多有5个异步加载请求该module
  //     maxInitialRequests: 3, //初始化的时候最多有3个请求该module
  //     automaticNameDelimiter: '~', //名字中间的间隔符
  //     name: true, //chunk的名字，如果设成true，会根据被提取的chunk自动生成。
  //     cacheGroups: { //要切割成的每一个新chunk就是一个cache group。
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,  //和CommonsChunkPlugin里的minChunks非常像，用来决定提取哪些module，可以接受字符串，正则表达式，或者函数，函数的一个参数为module，第二个参数为引用这个module的chunk(数组).
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20, //优先级高的chunk为被优先选择(说出来感觉好蠢),优先级一样的话，size大的优先被选择
  //         reuseExistingChunk: true //当module未变时，是否可以使用之前的chunk.
  //       }
  //     }
  //   }
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ]
})
