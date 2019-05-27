const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    // open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: './src/index.html'
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js" ,".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.tsx$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}