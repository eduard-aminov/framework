// console.log(config.template.substring(config.template.indexOf('{{') + 2, config.template.indexOf('}}')).trim());
// const elements = document.getElementsByTagName(config.selector);
//
// console.log(elements);
//
// if (!elements) {
//   throw new Error(`Cannot find elements with selector [${config.selector}]`);
// }
// Array.from(elements).forEach((element) => {
//   console.log('element', element);
//   element.innerHTML = config.template;
// });
import { Component, Type } from '~/decorators/component';

export function render(constructors: Type<any>[]): void {
  constructors.forEach((constructor) => {
    const componentOptions: Component = constructor.prototype.__annotations__;
    const tags = document.getElementsByTagName(componentOptions.selector);
    Array.from(tags).forEach((tag) => {
      tag.innerHTML = componentOptions.template;
    });
  });
}
