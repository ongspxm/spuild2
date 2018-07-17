#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const pug = require('pug');
const sass = require('sass');

const parentPath = process.argv[2] || '.';
const srcPath = `${parentPath}/src`;
const buildPath = `${parentPath}/build`;
const getPath = path => `${buildPath}${path.slice(srcPath.length)}`;

if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

const prettyPrint = false;

// generating the output //

function scss(fname) {
  return sass.renderSync({
    file: fname,
    sourceMap: false,
    sourceComments: false,
    outputStyle: prettyPrint ? 'nested' : 'compressed',
  }).css;
}

function jade(fname) {
  return pug.renderFile(fname, {
    pretty: prettyPrint,
  });
}

function copy(fname) {
  return fs.readFileSync(fname);
}

const funcs = {
  pug: jade,
  jade,
  scss,
  sass: scss,
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

      const fname2 = funcFormat(getPath(fname));
      fs.writeFileSync(fname2, funcOutput(fname));
    }
  });

  console.log('.');
});
