const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/' //图片打包路径
  },
  module: {
    rules: [
      // css-loader用来处理css中url的路径
      // style-loader可以把css文件变成style标签插入head中
      // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.join(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'stage-0', 'react'] // env转换es6， stage-0转换es7, react转换react，同时可以吧babel配置写到.babelrc中
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          // 如果需要，可以再sass-loader之前将resolve-url-loader链接进来
          use: ['css-loader']
        })
			},
			// file-loader是解析图片地址，把图片从源文件拷贝到目标文件并且修改源文件名字
			// 可以处理任意二进制文件，bootstrap里面的字体
			// url-loader可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
			{
				test: /\.(png|jpg|jpeg|gif|svg)/,
				use: {
					loader: 'url-loader',
					options: {
						outputPath: 'images', //图片输出路径
						limit: 5 * 1024
					}
				}
			},
			{
				test: /\.css$/,
				// css-loader用来处理css中url的路径
				// style-loader可以把css文件变成style标签插入到head中
				// 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
				// 此插件先用css-loader 处理一下css文件
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					// 如果需要，可以再sass-loader之前将resolve-url-loader链接进来
					use: ['css-loader', 'postcss-loader']
				})
			}
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[hash].css' // 放到dist/css下
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 静态文件根目录
    port: 8080,
    host: 'localhost',
    overlay: true,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
  }
};
