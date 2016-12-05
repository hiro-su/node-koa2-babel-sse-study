'use strict';

import { Transform } from 'stream';

export default class SSE extends Transform {
    constructor(payload) {
        super();
        this.payload = payload;
    }

    _transform(data, enc, cb) {
        this.push('event: ' + this.payload.event.toString('utf8') + '\n');
        this.push('retry: ' + this.payload.retry.toString('utf8') + '\n');
        this.push('id: '    + this.payload.id.toString('utf8') + '\n');
        this.push('data: '  + data.toString('utf8') + '\n\n');
        cb();
    }
}