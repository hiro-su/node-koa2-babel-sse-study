'use strict';

import { Transform } from 'stream';
import _ from 'lodash';
import uuid from 'node-uuid';

export default class SSEClient extends Transform {
  constructor(options) {
    options = _.extend({}, options, { objectMode: true });
    super(options);

    this.id = uuid.v4();
  }

  _transform(data, enc, cb) {

    this.push(`event: ${data.params.event}\n`);
    this.push(`retry: ${data.params.retry}\n`);
    this.push(`id: ${this.id}/${data.count}\n`);
    this.push(`data: ${data.value}\n\n`);

    cb();
  }
}
