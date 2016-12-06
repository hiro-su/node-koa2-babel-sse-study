'use strict';

import { Readable } from 'stream';
import _ from 'lodash';

export default class UserStream extends Readable {
  constructor(params, options) {
    options = _.extend({}, options, { objectMode: true });
    super(options);

    this.params = params;
  }

  _read() {
    setTimeout(() => {
      this.push(
        {
          value: Math.floor(this.params.id * Math.random() * 10),
          params: this.params
        }
      );
    }, 1000);
  }
}
