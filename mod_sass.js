const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

module.exports = function convert(fname, prettyPrint) {
  const css = sass.renderSync({
    file: fname,
    sourceMap: false,
    sourceComments: false,
    outputStyle: prettyPrint ? 'nested' : 'compressed',
  }).css;

  return postcss([ autoprefixer ]).process(css.toString())
    .then((result) => result.css);
};
