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
4. 路由的模式
``` 
BrowserRouter：浏览器的路由方式，也是我们一直在学习的路由方式，在开发中最常使用。
HashRouter：在路径前加入#号成为一个哈希值。Hash模式的好处是，再也不会因为我们刷新而找不到我们的对应路径了。
MemoryRouter：不存储history，所有路由过程保存在内存里，不能进行前进后退，因为地址栏没有发生任何变化。
NativeRouter：经常配合ReactNative使用，多用于移动端，以后ReactNative课程中会详细讲解。
StaticRouter：设置静态路由，需要和后台服务器配合设置，比如设置服务端渲染时使用。
```