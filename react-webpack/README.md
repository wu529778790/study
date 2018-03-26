# 手动创建react-webpack
1. 安装webpack-dev-server，配置
```
    devServer: {
        contentBase: './',
        host: 'host',
        compress: true,
        port: 8080
    }
```
2. 自动刷新浏览器，在output里面加图publicPath: 'temp/',然后再index.html引入'./temp/index.js'
3. 一般而言React会匹配所有能匹配的路由组阶，exact可以使我们的匹配更精确。exact的值为bool型，为true是表示严格匹配，为false时为正常匹配
```
<Route  path="/" component={Shenzjd} />
<Route  path="/Shenzjdb" component={Shenzjd} />
```
    
这种情况下，输入路由"/Shenzjd",会把Shenzjd组件也展示出来,所以我们经常使用exact来解决这个问题。
```
<Route  exact  path="/"  component={Jspang} />
<Route  path="/Jspangb" component={Jspangb} />
```
