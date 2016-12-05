'use strict';

import AppCtrl from './appCtrl';
import UserStream from '../model/userStream';
import SSEClient from './concerns/sseClient';
import eventStream from './concerns/eventStream';
import compose from 'koa-compose';

export default class UsersCtrl extends AppCtrl {
  index() {
    return async () => {
      super.raise('not implemented', 404);
    };
  }

  show() {
    return async (ctx) => {
      await ctx.render('users/show');
    };
  }

  stream() {
    return compose([
      eventStream(),
      async (ctx) => {
        const params = {
          event: 'user',
          retry: 15000,
          id: ctx.params.id,
        };

        const client = ctx.body = new SSEClient();

        const stream = new UserStream(params);
        stream.pipe(client);

        const socket = ctx.socket;
        socket.on('error', close);
        socket.on('close', close);

        function close() {
          stream.unpipe(client);
          socket.removeListener('error', close);
          socket.removeListener('close', close);
        }
      }
    ]);
  }
}
