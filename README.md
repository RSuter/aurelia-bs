# aurelia-bs - Bootstrap UI components for Aurelia JS

[![npm](https://img.shields.io/npm/v/aurelia-bs.svg)](https://www.npmjs.com/package/aurelia-bs)

This project provides Bootstrap UI (CSS framework) components for Aurelia JS. 

[Demo](https://rawgit.com/RSuter/aurelia-bs/master/demo/index.html)

## Installation

- Install via NPM: `npm install aurelia-bs --save`
- Register plugin in `boot.ts`

```
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-bs'))
```

## Usage

[Available components](docs/components/index.md)

## Development

### How to add a component

- Implement component
- Add component name to package.json in the path "aurelia.build.resources"
- Export view model class from "index.ts"
