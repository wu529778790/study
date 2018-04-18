# 引入方式
```
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(vant)
```
在main.js里面引入之后，要配置babel-plugin-import,要不然vueSPA本来就比较大，采用按需引入
```
npm i babel-plugin-import -D
在.babelrc中配置
"plugins": [
    "transform-vue-jsx", 
    "transform-runtime",
    ["import",{"libraryName":"vant","style":true}]
  ]
 
```