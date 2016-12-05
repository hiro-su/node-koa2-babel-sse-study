'use strict';

import { Transform } from 'stream';
import _ from 'lodash';

export default class SSEClient extends Transform {
  constructor(options) {
    options = _.extend({}, options, { objectMode: true });
    super(options);
  }

  _transform(data, enc, cb) {
    this.push('event: ' + data.payload.event.toString('utf8') + '\n');
    this.push('retry: ' + String(data.payload.retry).toString('utf8') + '\n');
    this.push('id: ' + String(data.payload.id).toString('utf8') + '\n');
    this.push('data: ' + String(data.value).toString('utf8') + '\n\n');
    cb();
  }
}
