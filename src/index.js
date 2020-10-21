import koa from 'koa'
import router from './routes/index'
// const koa = require('koa')
// const router = require('./routes/index')

const app = new koa()
app.use(async ctx => {
  console.log('xsxx');
  ctx.body = 'Hello World xxx';
});

// app.use(router())
app.listen(3000);