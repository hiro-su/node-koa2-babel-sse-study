'use strict';

import { Transform } from 'stream';
import _ from 'lodash';
import uuid from 'uuid/v4';

export default class SSEClient extends Transform {
  constructor(lastEventId, options) {
    options = _.extend({}, options, { objectMode: true });
    super(options);

    if (lastEventId) {
      const lastEvent = lastEventId.split('/')
      this.id = lastEvent[0];
      this.count = parseInt(lastEvent[1]);
    } else {
      this.id = uuid();
      this.count = 1;
    }
  }

  _transform(data, enc, cb) {
    this.push(`event: ${data.params.event}\n`);
    this.push(`retry: ${data.params.retry}\n`);
    this.push(`id: ${this.id}/${this.count++}\n`);
    this.push(`data: ${data.value}\n\n`);

    cb();
  }
}
