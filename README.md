# Spuild: Web build tool in NodeJS

This build tool automates the web development build process. Currently, these are plugins that are ready for use:

- Generating HTML from JADE templates
- Generating CSS form SCSS templates

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
 |  |_ index.jade
 |  |_ style.scss
 |  |_ all-other-files.txt
 |_ build/
    |_ assets/
    |_ index.html
    |_ style.css
    |_ all-built-files.txt
```
