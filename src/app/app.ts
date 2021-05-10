import { Type } from '~/decorators/component';
import { render } from '~/core/renderer';
import { Module } from '~/decorators/module';

export const bootstrapApp = <T>(module: Type<T>): void => {
  const app = document.querySelector(`#app`);

  if (!app) {
    throw new Error(`Cannot init app`);
  }
  app.insertAdjacentHTML('beforeend', `<app-root></app-root>`);
  new module();
  const moduleOptions: Module = module.prototype.__annotations__;
  render(moduleOptions.declarations);
};
