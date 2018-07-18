#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const jade = require('./mod_jade.js');
const sass = require('./mod_sass.js');

const parentPath = process.argv[2] || '.';
const srcPath = `${parentPath}/src`;
const buildPath = `${parentPath}/build`;
const getPath = path => `${buildPath}${path.slice(srcPath.length)}`;

const prettyPrint = false;
// generating the output //
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

glob(`${srcPath}/**/*`, (err, files) => {
  if (files.length === 0) {
    return console.log('empty!');
  }

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  }

  files.forEach((fname) => {
    if (fs.lstatSync(fname).isDirectory()) {
      const dname = getPath(fname);
      if (!fs.existsSync(dname)) {
        fs.mkdirSync(dname);
      }
    } else {
      console.log(fname);

      const fext = fname.split('.').slice(-1)[0];
      const funcOutput = funcs[fext] || copy;
      const funcFormat = formats[fext] || identity;

      const fname2 = funcFormat(getPath(fname), prettyPrint);
      funcOutput(fname).then(content => fs.writeFileSync(fname2, content));
    }
  });

  return console.log('.');
});
