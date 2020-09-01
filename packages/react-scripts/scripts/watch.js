'use strict';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('../config/paths');
const webpack = require('webpack');
const config = require('../config/webpack.config.js')(process.env.NODE_ENV);

// config.entry = config.entry.filter(
//   entry => !entry.includes('webpackHotDevClient')
// );

config.output.path = paths.appBuild;

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(
    stats.toString({
      chunks: false,
      colors: true,
    })
  );
});

function copyPublicFolder() {
  fs.existsSync(paths.appPublic) &&
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: file => file !== paths.appHtml,
    });
}
