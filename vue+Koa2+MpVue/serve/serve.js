const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello koa'
})

app.listen(2000, () => {
  console.log('serve starting at 2000')
})
