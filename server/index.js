const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
const cors = require('koa2-cors')
const router = require('./router')
const bodyparser = require('koa-better-body')

 
//设置静态资源的路径 
const staticPath = './' //这里设置为'/'也一样，以server所在目录为根目录/

app.use(cors())
app.use(static(
  path.join( __dirname,  staticPath)
))
app.use(bodyparser())
app.use(router.routes())
 
app.listen(3000, () => {
  console.log('server is starting at port 3000')
})

