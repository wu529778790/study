

# webpack从零构建vue工程

npm i webpack webpack-cli -d

npm i webpack-dev-server -d

npm i html-webpack-plugin -d

## 配置babel v7

webpack 4.x | babel-loader 8.x | babel 7.x

npm i babel-loader @babel/core @babel/preset-env -d

babel plugin 

支持动态import()

npm i @babel/plugin-syntax-dynamic-import -d

## 配置vue-loader

npm i vue

npm i vue-loader vue-template-compiler

vue-template-compiler (peer dependency) 是vue-loader的同版本依赖

npm i css-loader -D

## 配置css预处理器

npm i stylus stylus-loader

## postcss

提供了一个解析器，它能够将 CSS 解析成抽象语法树（AST）

npm i -D postcss-loader

autoprefixed

解析CSS文件并且添加浏览器前缀到CSS内容里

npm i -D autoprefixer

## 图片资源配置

url-loader将图片资源转换成base64 URI

file-loader加载图标字体

cross-env设置命令运行时的环境变量 以便在webpack配置文件中区分环境

## css提取

npm i mini-css-extract-plugin -D

## 清理dist目录

npm i clean-webpack-plugin -D

## .editorconfig

在不同的编辑器和IDEs中为多个从事同一项目的开发人员保持一致的编码风格。

```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

## 代码校验

npm i eslint eslint-plugin-vue -D

eslint的各种安装

npm i -D babel-eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

创建.eslintrc

```
{
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceMap: "module"
  },
  extends: [
    "plugin:vue/essential",
    "standard"
  ],
  rules: {}
}
```

webpack中eslint配置

npm i eslint-loader -D

## devServer.overlay

把编译错误，直接显示到浏览器页面上。

## git hooks钩子函数

npm install husky --save-dev

创建.huskyrc

```
// .huskyrc
{
  "hooks": {
    "pre-commit": "npm run lint"
  }
}
```

https://mp.weixin.qq.com/s?__biz=MzAxMDQ4NzAxOA==&mid=2649834078&idx=1&sn=a6b06a5a439e2e61eba39ffd6602709e&chksm=834a77dbb43dfecdf995521d9b4a037d48a4280a200c164bd37f397d494f1a80077bf61b69d5&scene=0&xtrack=1&key=e94162cbfbd13b53f8b930bc1bf34cc26365b4968fabc85f5e919cfddacbf1f9481f33034f9e12bb29c55f08f47b88389e2127c8bfbaf67ffa20e6ee88b60c87e9994e66b8fe5c8cd4e8562531555f0f&ascene=1&uin=MTc3MDY0ODUxNA%3D%3D&devicetype=Windows+10&version=62060719&lang=zh_CN&pass_ticket=hhM0gfQP830WApBHTKj%2B3q1uzZI0%2BGQP1znEZPDWNTnrnOFK1Druq72D%2BKU3CpLs