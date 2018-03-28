# 从零配置webpack4
## 配置webpack 
```
yarn add webpack webpack-cli -D //webpack4把webpack拆分了
```
## 配置开发服务器
```
yarn add webpack-dev-server -D
```
## 支持css文件
```
yarn add style-loader css-loader -d
// css-loader用来处理css中url的路径
// style-loader可以把css文件变成style标签插入head中
// 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
```
## 支持es6，react等
```
yarn add babel-loader babel-core babel-preset-env babel-preset-stage-0 babel-preset-react -d
// env转换es6 stage-0转es7 react转react
```
## 从js中分离css
```
yarn add extract-text-webpack-plugin -d
```
## 支持图片
```
yarn add file-loader url-loader -d
file-loader 解决css等文件中引入图片路径的问题
url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
```
