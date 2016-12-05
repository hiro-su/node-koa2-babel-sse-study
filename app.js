'use strict';

import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import logger from 'koa-morgan';
import moment from 'moment';
import { router, settings } from './config';

const app = new Koa();

// set logger
logger.token('date', format => {
  const clf = 'DD/MMM/YYYY:HH:mm:ss ZZ';
  return moment(format._startTime).format(clf);
});
app.use(logger('combined'));

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    console.error(err);
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

// render
app.use(views(__dirname + '/app/views', { extension: 'jade' }));
app.use(serve(__dirname + '/app/assets'));

// routing
app.use(router.routes())
   .use(router.allowedMethods());

module.exports = app;
