const pug = require('pug');

module.exports = function jade(fname, prettyPrint) {
  return Promise.resolve(pug.renderFile(fname, {
    pretty: prettyPrint,
  }));
};
