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
import { Metadata } from '~/core/enums/metadata';
import { injector } from '~/core/injector';

export function render(constructors: Type<any>[]): void {
  constructors.forEach((constructor) => {
    // const componentProps: PropsMetadata = constructor.prototype?.[Metadata.PropMetadata];
    const instance = injector.getDependency(constructor);

    const componentOptions: Component = constructor.prototype?.[Metadata.Annotations];

    if (componentOptions && componentOptions.template) {
      const props = getPropsFromBrackets(componentOptions.template);
      if (props) {
        for (let prop of props) {
          const propValue = instance[prop];
          const bindWithPropTmpl = setPropValueToTemplate(propValue, componentOptions.template);
          if (instance && Object.getOwnPropertyDescriptor(instance, prop)) {
            constructor.prototype[Metadata.Annotations].template = bindWithPropTmpl;
          }
        }
      }
    }

    const tags = document.getElementsByTagName(componentOptions.selector);
    Array.from(tags).forEach((tag) => {
      tag.innerHTML = componentOptions.template;
    });
  });
}

function getPropsFromBrackets(template: string): string[] {
  const pattern = /{{(.*?)}}/g;
  return template.match(pattern)?.map(match => {
    return match.split('{{').join('').split('}}').join('').trim();
  });
}

function setPropValueToTemplate(propValue: string, template: string): string {
  if (!propValue) {
    return template;
  }
  const pattern = /({{.*?}})/;
  return template.replace(pattern, propValue);
}
