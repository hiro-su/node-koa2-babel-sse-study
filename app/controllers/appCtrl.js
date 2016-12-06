'use strict';

import path from 'path';
import fs from 'fs';

export default class AppCtrl {
  get assets() {
    const assetsPath = path.join(__dirname, '../../webpack-assets.json');
    const assets = fs.readFileSync(assetsPath, 'utf8');
    return JSON.parse(assets);
  }

  raise(msg, status) {
    const err = new Error(msg);
    err.status = status;
    throw err;
  }
}
