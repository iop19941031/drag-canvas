const path = require('path')

const resolve = dir => path.join(__dirname, '..', dir)
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html模板
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    // 配置loader
    rules: [
      {
        test: /\.js$/,
        include: resolve('src'), // 只解析src下面的文件,不推荐用exclude
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('/dist/index.html'), // 生成的html文件存放的地址和文件名
      template: resolve('/index.html') // 基于index.html模板进行生成html文件
    })
  ]
}
