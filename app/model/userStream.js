'use strict';

import { Readable } from 'stream';
import _ from 'lodash';

export default class UserStream extends Readable {
  constructor(payload, options) {
    options = _.extend({}, options, { objectMode: true });
    super(options);
    this.payload = payload;
    this.value = this.payload.id;
  }

  _read() {
    setTimeout(() => {
      this.push(
        {
          value: this.value++,
          payload: this.payload
        }
      );
    }, 1000);
  }
}
