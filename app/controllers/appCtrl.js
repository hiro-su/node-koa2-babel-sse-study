'use strict';

export default class AppCtrl {
  raise(msg, status) {
    const err = new Error(msg);
    err.status = status;
    throw err;
  }
}
