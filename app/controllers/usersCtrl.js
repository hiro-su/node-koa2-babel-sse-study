'use strict';

import AppCtrl from './appCtrl';
import UserStream from '../model/userStream';
import SSEClient from './concerns/sseClient';
import eventStream from './concerns/eventStream';
import compose from 'koa-compose';
import moment from 'moment';

export default class UsersCtrl extends AppCtrl {
  clients = [];

  index() {
    return async () => {
      this.raise('not implemented', 404);
    };
  }

  show() {
    return async (ctx) => {
      ctx.state = this.assets;
      await ctx.render('users/show');
    };
  }

  stream() {
    return compose([
      eventStream(),
      async (ctx) => {
        const self = this;
        const params = {
          event: 'user',
          retry: 10000,
          id: ctx.params.id,
        };

        const lastEventId = ctx.headers['last-event-id'];
        const client = ctx.body = new SSEClient(lastEventId);

        self.clients.push(client);
        console.log(`[${moment().format()}] connect: ${client.id}/${client.count}`);
        console.log(`[${moment().format()}] ${self.clients.length} clients connected`);

        const stream = new UserStream(params);
        stream.pipe(client);

        const socket = ctx.socket;
        socket.on('error', close);
        socket.on('close', close);

        function close() {
          self.clients.some((v, i) => {
            if (v == client) self.clients.splice(i, 1);
          });
          console.log(`[${moment().format()}] closee: ${client.id}/${client.count}`);
          console.log(`[${moment().format()}] ${self.clients.length} clients...`);

          stream.unpipe(client);
          socket.removeListener('error', close);
          socket.removeListener('close', close);
        }
      }
    ]);
  }

  close() {
    return async (ctx) => {
      const id = ctx.params.id;
      let client;
      this.clients.some((v, i) => {
        if (v.id == id) client = v;
      });

      client.write({ params: { event: 'close' } });
      ctx.body = '200 ok';
    };
  }
}
