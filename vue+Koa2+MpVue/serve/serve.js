const Koa = require('koa')
const app = new Koa()

// app.use(async (ctx, next) => {
//   ctx.body = 'hello koa'
// })

app.use(async (ctx, next) => {
  ctx.body = '1'
  setTimeout(() => {
    next()
  }, 1000)
  ctx.body += '2'
})
app.use(async (ctx, next) => {
  ctx.body += '3'
  setTimeout(() => {
    next()
  }, 1000)
  ctx.body += '4'
})
app.use(async (ctx, next) => {
  ctx.body += '5'
  setTimeout(() => {
    next()
  }, 1000)
  ctx.body += '6'
})

app.listen(2000, () => {
  console.log('serve starting at 2000')
})
