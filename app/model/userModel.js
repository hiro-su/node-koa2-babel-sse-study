'use strict';

import { Readable } from 'stream';

export default class UserModel extends Readable {
    constructor(options) {
        super(options);

        this.value = 0;
    }

    _read() {
        while(this.push(String(this.value++))){};
    }
}