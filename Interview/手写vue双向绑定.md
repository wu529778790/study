# 原理

Vue的双向数据绑定的原理，主要是通过Object对象的defineProperty属性，重写data的set和get函数来实现的。
![原理](./img/1.png)

# 实现v-model，v-bind， v-click