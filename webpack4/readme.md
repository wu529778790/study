# 从零配置webpack4
## 配置webpack 
```
yarn add webpack webpack-cli -D //webpack4把webpack拆分了
```
webpack.config.js
```
module.exports = {
    entry: './src/index.js', //入口文件，src下的index.js
    output: {
        path: path.join(__dirname, 'dist'), // 出口目录，dist文件
        filename: '[name].[hash].js' //这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
    },
    module: {},
    plugin: {},
    devServer: {}
}
```
## 配置开发服务器
```
yarn add webpack-dev-server -D
修改webpack.config.js
devServer: {
    contentBase: path.join(__dirname, "dist"), //静态文件根目录
    port: 9090, // 端口
    host: 'localhost',
    overlay: true,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
}
修改package.json
"script": {
    "build": "webpack --mode development", //这里为了不压缩代码，用开发环境
    "dev": "webpack-dev-server --open --mode development"
}
```
## 支持css文件
```
yarn add style-loader css-loader -d
// css-loader用来处理css中url的路径
// style-loader可以把css文件变成style标签插入head中
// 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
module: {
    rules: {
        test: /\.css$/,
        use: ['style-laoder', 'css-loader'],
        include: path.join(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/
    }
}
```
## 支持es6，react等
```
yarn add babel-loader babel-core babel-preset-env babel-preset-stage-0 babel-preset-react -d
// env转换es6 stage-0转es7 react转react
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      query: {
        presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
      }
    }
  }
  同时可以把babel配置写到.babelrc中

```
## 从js中分离css
```
yarn add extract-text-webpack-plugin -d
{
    test: /\.css$/, // 转换文件的匹配正则
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
      use: ['css-loader']
    })
},
//加上plugin
plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[hash].css' //放到dist/css/下
    })
]
```
## 支持图片
```
yarn add file-loader url-loader -d
file-loader 解决css等文件中引入图片路径的问题
url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
{
// file-loader是解析图片地址，把图片从源文件拷贝到目标文件并且修改源文件名字
// 可以处理任意二进制，bootstrap里的字体
// url-loader可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
{
    test: /\.(png|jpg|jpeg|gif|svg)/,
    use: {
      loader: 'url-loader',
      options: {
        outputPath: 'images/', // 图片输出的路径
        limit: 5 * 1024
      }
    }
},
// 同时要处理打包图片路径问题，
output: {
    publicPath: '/'
}
```
## 处理css3属性前缀
```
yarn add postcss-loader -d
{
    test: /\.css$/, // 转换文件的匹配正则
    // css-loader用来处理css中url的路径
    // style-loader可以把css文件变成style标签插入head中
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    // 此插件先用css-loader处理一下css文件
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
      use: ['css-loader', 'postcss-loader']
    })
},
建立.postcssrc.js文件
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "ie >= 9",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23"
      ]
    }
  }
}
```
## 调试打包的代码
webpack通过配置可以自动给我们source maps文件，map文件是一种对应便以文件和源文件的方法
devtool: 'eval-source-map'
```
1. source-map 把映射文件生成到单独的文件，最完整最慢
2. cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
3. eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
4. cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列
```
## 压缩js
```
webpack --mode production 会压缩，可以忽略下面
yarn add uglifyjs-webpack-plugin -D
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
new UglifyjsWebpackPlugin(),
```
## 压缩css
```
webpack --mode production 会压缩，可以忽略下面
{
    test: /\.css$/, // 转换文件的匹配正则
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      use: [
          {
             loader: 'css-laoder',
             options: {minimize: true}
          },
          'postcss-loader'
      ]
    })
},
```
## 清空打包输出文件
```
yarn add clean-webpack-plugin -D
const CleanWebpackPlugin = require('clean-webpack-plugin')
new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
```
## 区分环境变量

许多library将通过与process.env.NODE_ENV环境变量关联，已决定library中应该引用哪些内容，我们可以使用webpack内置的DefinePlugin为所有的依赖定义这个变量
```
"scripts": {
    "build": "cross-env NODE_ENV=production webpack --mode development", // 设置NODE_ENV为production
    "dev": "webpack-dev-server --open --mode development "
},
new webpack.DefinePlugin({
    NODE_ENV:JSON.stringify(process.env.NODE_ENV)
})
在全局都有NODE_ENV这个变量,当yarn run build,时，NODE_ENV = 'production'
```
## 暴露全局变量

```
new Webpack.ProvidePlugin({
  '$': 'jquery'
}),
```
## resolve解析
```
xtension：指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
resolve: {
    //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
    extension: ['', '.js', '.json', '.css']
}
alias: 配置别名可以加快webpack查找模块的速度
resolve: {
    alias: {
        'bootstrap': 'bootstrap/dist/css/bootstrap.css'
    }
}
```
## 复制静态资源
```
yarn add copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, 'static'),
    to: path.resolve(__dirname, 'pages/static'),
    ignore: ['.*']
  }
])
```

# webpack高级

## css tree Shaking 
```
yarn add purify-css purifycss-webpack -d
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
// 去除无用的css
plugins: [
    new PurifyCSSPlugin({
        // 路径扫描nodejs内置路径检查
        paths: glob.sync(path.join(__dirname, 'pages/*/*.html))
    })
]
```
## js优化
```
yarn add webpack-parallel-uglify-plugin -D
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
plugins: [
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
]
```
## 提取公共代码
```
// webpack4最新配置，可以搜索关键字查查配置项
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common'
        }
      }
    }
  },
```
## 打包第三方类库
DllPlugin插件： 用于打包出一个个动态连接库
DllReferencePlugin: 在配置文件中引入DllPlugin插件打包好的动态连接库
```
在package.json中
  "scripts": {
    "build": "webpack --mode development",
    "build:dll": "webpack --config webpack.dll.config.js --mode development",
    "dev": "webpack-dev-server --open --mode development"
  }
新建webpack.dll.config.js  
const path = require('path')
const webpack = require('webpack')

/**
 * 尽量减小搜索范围
 * target: '_dll_[name]' 指定导出变量名字
 */

 module.exports = {
   entry: {
     vendor: ['jquery', 'lodash']
   },
   output: {
     path: path.join(__dirname, 'static'),
     filename: '[name].dll.js',
     library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
   },
   // manifest是描述文件
   plugins: [
     new webpack.DllPlugin({
       name: '_dll_[name]',
       path: path.join(__dirname, 'manifest.json')
     })
   ]
 }

 在webpack.config.js中
plugins: [
    new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, 'manifest.json')
    })
]
执行npm run build:dll 就可以打包第三方包了

```
## 使用happypack
HappyPack就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。 happypack
```
npm i happypack@next -D
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

  {
    test: /\.js$/,
    // loader: 'babel-loader',
    loader: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
    include: [resolve('src')],
    exclude: /node_modules/,
  }
  
  plugins: [
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    })
]
```
## 显示打包时间
```
yarn add progress-bar-webpack-plugin -D
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
]
```
## 多页配置
```
  entry: { //entry是一个字符串或者数组都是单页，是对象则是多页，这里是index页和base页
    index: './pages/index/index.js',
    base: './pages/base/base.js'
  }
  
  一个页面对应一个html模板，在plugin中
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index/index.html',
      filename: 'pages/index.html',
      hash: true,
      chunks: ['index', 'common'],
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './pages/base/base.html',
      filename: 'pages/base.html',
      hash: true,
      chunks: ['base', 'common'],
      minify: {
        removeAttributeQuotes: true
      }
    }),
  ]
```