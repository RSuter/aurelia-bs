/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { BsSettings } from './settings';

import * as Promise from 'bluebird';

Promise.config({
  longStackTraces: false,
  warnings: false // note, run node with --trace-warnings to see full stack traces for warnings
});
(<any>window).Promise = Promise;

import * as binding from 'aurelia-binding';

let subscribe = (<any>binding).DirtyCheckProperty.prototype.subscribe;
(<any>binding).DirtyCheckProperty.prototype.subscribe = (context: any, callable: any) => {
  subscribe(context, callable);
  console.warn(`'${this.obj.constructor.name}.${this.propertyName}' is being dirty checked!`, this.obj);
};

// Change aurelia-bs settings
BsSettings.language = window.location.search.indexOf('lang=de') !== -1 ? 'de' : 'en';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .globalResources([
      PLATFORM.moduleName('dialog'),
      PLATFORM.moduleName('scroll'),
      PLATFORM.moduleName('checkbox'),
      PLATFORM.moduleName('resize-container'),
      PLATFORM.moduleName('textbox'),
      PLATFORM.moduleName('searchbox'),
      PLATFORM.moduleName('datepicker'),
      PLATFORM.moduleName('accordion/accordion'),
      PLATFORM.moduleName('accordion/accordion-item'),
      PLATFORM.moduleName('accordion/accordion-item-header'),
      PLATFORM.moduleName('select'),
      PLATFORM.moduleName('expander'),
      PLATFORM.moduleName('fileupload'),
      PLATFORM.moduleName('loader'),
      PLATFORM.moduleName('navbar-header'),
      PLATFORM.moduleName('button'),
      PLATFORM.moduleName('label-collection'),
      PLATFORM.moduleName('grid-filter'),
      PLATFORM.moduleName('select-grid/select-grid'),
      PLATFORM.moduleName('grid/grid'),
      PLATFORM.moduleName('grid/column'),
      PLATFORM.moduleName('tabs/tabs'),
      PLATFORM.moduleName('tabs/tab')]);

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('demo/app/app')));
}
