// server here, not sure if to integrate with next.js or standalone

const Koa = require("koa");
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = "Hello Koa";
});

app.listen(3042);
