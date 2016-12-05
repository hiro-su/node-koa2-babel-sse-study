'use strict';

import Koa from 'koa';
import { router, settings } from './config';

const app    = new Koa(),
      logger = require('koa-morgan'),
      moment = require('moment');

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

// routing
app.use(router.routes())
   .use(router.allowedMethods());

module.exports = app;
