'use strict';

import Router from 'koa-router';
const router = Router();

import UsersCtrl from '../app/controllers/usersCtrl';
const users = new UsersCtrl();

router
  .get('/', users.index())
  .get('/users', users.index())
  .get('/users/:id', users.show())
  .get('/stream/:id', users.stream())
  .get('/stream/:id/close', users.close());

module.exports = router;
