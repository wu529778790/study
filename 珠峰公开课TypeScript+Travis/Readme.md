# 初始化项目

yarn init -y 
touch .gitignore

# 安装依赖

$ yarn add react @types/react react-dom @types/react-dom react-router-dom @types/react-router-dom -s

yarn add react @types/react react-dom @types/react-dom react-router-dom @types/react-router-dom -s

yarn add typescript ts-loader source-map-loader -d

yarn add redux react-redux @types/react-redux redux-thunk redux-logger @types/redux-logger -s

yarn add connected-react-router -s

| 包名 | 作用 |
| :-- | :-- |
| react @types/react | react核心库 |
| react-dom @types/react-dom | react操作DOM库 |
| react-router-dom @types/react-router-dom | react路由库 |
| react-transition-group @types/react-transition-group | react动画库 |
| react-swipe @types/react-swipe | react轮播组件库 |
| webpack | webpack核心库 |
| webpack-cli | webpack命令行文件 |
| webpack-dev-server | webpack开发服务器 |
| html-webpack-plugin | webpack用于生成html的插件 | 
| redux | 全局状态管理库 |
| react-redux @types/react-redux | 连接react和redux的库 | 
| redux-thunk | 可以让store派发一个函数的中间件 |
| redux-logger | 可以在状态改变前后打印状态的中间件 | 
| typescript | js语言扩展 |
| ts-loader | 可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码 |
| source-map-loader | 使用任意来自TypeScript的sourcemap输出，以此通知webpack何时生成自己的sourcemaps，这让你在调试最终生成的文件时就好像在调试TypeScript源码一样 | 

# 支持TypeScript
- 需要建立一个tsconfig.json文件来告诉ts-loader如何编译TypeScript代码

yarn add typescript -g 
tsc --init
```
{
  "compilerOptions": {
    "outDir": "./dist",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": [
    "./src/**/*"
  ]
}
```

| 参数 | 含义 | 
| :--: | :-- |
| outDir | 指定输出目录 |
| sourceMap | 把ts文件编译成js文件的时候，同时生成对应的sourceMap文件 |
| nolmllicitAny | 如果为true的话，TypeScript编辑器无法推断出类型时，它仍然会生成js文件，但是他会报一个错误 | 
| module | 模块化的代码规范 |
| target | 转换成es5 | 
| jsx | react模式会生成React.createElement，在使用前不需要进行转换操作了，输出文件的扩展名为.js | 
| include | 需要编译的目录 |

# 编写webpack配置文件

```
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
```
# 代码检查eslint

yarn add eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

eslint中文rules：https://eslint.cn/docs/rules/

```
module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-var": "error",
    "no-extra-semi": "error",
    "@typescript-eslint/indent": ["error", 2] 
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  }
}
```

vscode自动化配置：
```
{
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
      "javascript",
      "javascriptreact",
      {
          "language": "typescriptreact",
          "autoFix": true
      }
  ]
}
```

# git Hooks检查

git的钩子函数，便于在提交代码的时候做一些检查工作
git的钩子函数存放在git目录下的hooks子目录中.git/hook

## pre-commit

pre-commit就是在代码提交之前做些东西，比如打包，代码检测，称之为钩子

在commit之前执行一个函数，执行完之后在commit，但是失败之后就组织commit

在.git/hook下面有一个pre-commit.sample，这个里面就是默认的函数脚本

yarn add pre-commit -d

## 配置脚本

在package.json里面加入
```
"pre-commit": [
  "eslint"
]
```

# 单元测试

目前比较流行的React单元测试组合是Jest+Enzyme

Jest是Facebook开发的一个测试框架，他继承了测试执行器，断言库，spy，mock，snapshot和测试覆盖率报告等功能。React项目本身也是使用Jest进行单元测试的，因此他们俩的锲合度很高

enzyme是由airbnb开发的React单元测试工具。它扩展了React的TestUtils并通过支持类似jQuery的find语法可以很方便的对render出来的结果做出各种断言

## 安装单元测试工具

yarn add jest @types/jest ts-jest enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 -d

配置package.json

```
"jest": {
  "moduleFileExtendsions": [
    "js",
    "ts",
    "tsx"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": [
    "<rootDir>/test/**/*.(spec|test).tsx"
  ]
}
```
https://github.com/zhufengnodejs/zhufeng_ts_react