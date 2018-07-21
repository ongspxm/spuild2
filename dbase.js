const low = require('lowdb');
const LowFile = require('lowdb/adapters/FileSync');

function DB(fname) {
  this.db = low(new LowFile(fname, {}));
  return this;
}

DB.prototype.reset = function reset() {
  this.db.setState({}).write();
  return this;
};

DB.prototype.getTstamp = function getTstamp(fname) {
  return this.db.get(fname).value();
};

DB.prototype.setTstamp = function setTstamp(fname, tstamp) {
  this.db.set(fname, tstamp).write();
  return this;
};

module.exports = DB;
