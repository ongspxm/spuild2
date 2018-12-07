#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const DB = require('./dbase.js');
const jade = require('./mod_jade.js');
const sass = require('./mod_sass.js');

const args = process.argv.slice(2);

const srcPath = './src';
const buildPath = './build';
const spuildPath = './spuild.json';
const getPath = path => `${buildPath}${path.slice(srcPath.length)}`;

const getFlag = f => args.indexOf(f) !== -1;
const flagClean = getFlag('-c');
const flagPrettyPrint = getFlag('-p');

function copy(fname) {
  return Promise.resolve(fs.readFileSync(fname));
}

const funcs = {
  pug: jade,
  jade,
  sass,
  scss: sass,
};

// formats stuff //
function swapFormat(fext) {
  return (path) => {
    const fname = path.split('.').slice(0, -1).join('.');
    return `${fname}.${fext}`;
  };
}

function identity(fext) {
  return fext;
}

const formats = {
  pug: swapFormat('html'),
  jade: swapFormat('html'),
  scss: swapFormat('css'),
  sass: swapFormat('css'),
};

const isDir = f => fs.lstatSync(f).isDirectory();
glob(`${srcPath}/**/*`, (err, files) => {
  if (files.length === 0) {
    return console.log('empty!');
  }

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  }

  if (flagClean) {
    // --- reversed to ensure directory is empty
    glob.sync(`${buildPath}/**/*`).reverse()
      .forEach(f => isDir(f) ? fs.rmdirSync(f) : fs.unlinkSync(f));
    console.log('cleaned build folder');
  }

  const db = new DB(spuildPath);
  const updatedState = flagClean || db.get('pprint') !== flagPrettyPrint;

  files.forEach((fname) => {
    if (isDir(fname)) {
      const dname = getPath(fname);
      if (!fs.existsSync(dname)) {
        fs.mkdirSync(dname);
      }
    } else {
      const mtime = fs.statSync(fname).mtime.getTime();
      const rname = fname.slice(srcPath.length);

      const statePrettyPrint = db.get('pprint');
      if (updatedState || mtime !== db.get(rname)) {
        console.log(fname);
        const fext = fname.split('.').slice(-1)[0];
        const funcOutput = funcs[fext] || copy;
        const funcFormat = formats[fext] || identity;

        const fname2 = funcFormat(getPath(fname), flagPrettyPrint);
        funcOutput(fname).then(content => fs.writeFileSync(fname2, content));
        db.set(rname, mtime);
      }
    }
  });

  db.set('pprint', flagPrettyPrint);
  db.save();

  return console.log(`\n${flagPrettyPrint ? 'pprinted' : 'compressed'}`);
});
