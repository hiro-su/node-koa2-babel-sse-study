'use strict';

import AppCtrl from './appCtrl';
import UserModel from '../model/userModel';
import SSE from './concerns/sse';
import eventStream from './concerns/eventStream';

export default class UsersCtrl extends AppCtrl {
  index() {
    return async (ctx, next) => {
      ctx.body = 'users';
    };
  }

  show() {
    return async () => {
      super.raise('not implemented', 404);
    };
  }

  stream() {
    return async (ctx, next) => {
      eventStream(ctx, next);

      const payload = {
        event: 'some event',
        retry: '15000',
        id: ctx.params.id,
      }

      const body = ctx.body = new SSE(payload);
      const stream = new UserModel({});
      stream.pipe(body);

      const socket = ctx.socket;
      socket.on('error', close);
      socket.on('close', close);

      function close() {
        stream.unpipe(body);
        socket.removeListener('error', close);
        socket.removeListener('close', close);
      }
    };
  }
}