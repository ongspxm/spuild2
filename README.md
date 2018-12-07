# Spuild: Web build tool in NodeJS

This build tool automates the web development build process. Currently, these are plugins that are ready for use:

- Generating HTML from JADE templates (`.jade` or `.pug`)
- Generating CSS form SCSS templates (`.scss`, or `.sass`)

More details on inspiration [here](https://ongspxm.github.io/blog/2018/07/spuild2/).

## install
### from source
- `git clone <this repository>`
- `cd spuild2`
- `npm install`
- `npm link` (allows you to call `spuild` globally)

### from npm
- `npm install -g spuild`

## basic usage, in directory
ensure you are in your project directory, which is organized in the following way.

**before**
```
 project
 |_ src/
    |_ assets/
    |_ index.jade
    |_ style.scss
    |_ all-other-files.txt
```

running `spuild` in `project/`.

**after**
```
 project
 |_ src/
 |  |_ assets/
 |  |_ .dot-files-ignored
 |  |_ index.jade
 |  |_ style.scss
 |  |_ all-other-files.txt
 |_ build/
    |_ assets/
    |_ index.html
    |_ style.css
    |_ all-built-files.txt
```

### pretty printing feature
by default, the output of `spuild` is compressed. with the `-p` flag activated, your build will be rendered. If your output is not previously in the same state (pretty-printed VS compressed), it will be re-rendered too.

### clean build feature
this feature will remove the existing files in the build folder before re-rendering every file from `src`. If `build` is tracked using `git`, no worries, your `.git` folder will be left untouched.
