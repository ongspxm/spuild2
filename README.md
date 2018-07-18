# Spuild: Web build tool in python

This build tool automates the web development build process. Well, there is gulp and there is grunt, which are much more feature-packed. But in a limited development environment where there is little permission, **spuild** is the tool for you.

Currently, these are plugins that are ready for use:

- Generating HTML from JADE templates
- Generating CSS form SCSS templates

## install
`npm install -g spuild`

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
