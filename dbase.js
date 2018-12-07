const fs = require('fs');

module.exports = function dbFunc(fname) {
  const data = !fs.existsSync(fname) ? {}
    : JSON.parse(fs.readFileSync(fname));

  return {
    data,
    get: key => data[key],
    set: (key, val) => { data[key] = val; },
    save: () => fs.writeFileSync(fname, JSON.stringify(data)),
    reset: () => Object.keys(data).forEach(k => delete (data[k])),
  };
};
