

# 目录结构

- nuxt // nuxt自动生成，历史的用于编辑的文件
- assets // 用于组织未变异的静态资源如less，sass，或js
- components // 用于自己编写的vue组件，比如滚动组件，日历组件，分页组件
- layouts // 布局目录，用于组织应用的布局组件，不可更改
- middleware // 用于存放中间件
- pages //用于存放写的页面，我们的主要工作区域
- plugins // 用于存放js插件的地方
- static // 用于存放静态资源文件，比如图片
- store // vuex的状态管理
- .editorconfig // 开发工具格式配置
- .eslintrc.js eslint的配置文件，用于检查代码格式
- .gitignore // 配置git不上传的文件
- nuxt.config.json // 用于组织nuxt。js应用的个性化配置，已覆盖默认配置



# nuxt

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).