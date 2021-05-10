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
import { eventManager } from '~/core/event-manager';
import { EventMetadata } from '~/decorators/host-listener';

export function render(constructors: Type<any>[]): void {
  constructors.forEach((constructor) => {
    const componentOptions: Component = constructor.prototype?.[Metadata.Annotations];
    const propMetadata = constructor.prototype?.[Metadata.PropMetadata];
    const tags = document.getElementsByTagName(componentOptions.selector);
    const instance = injector.getDependency(constructor);
    let events = [];

    if (propMetadata) {
      events = Object.entries(propMetadata).map((value: [string, EventMetadata]) => {
        const eventName = value[1] && Object.getOwnPropertyDescriptor(value[1], 'eventType') && value[0];
        if (instance[eventName]) {
          return {
            eventName,
            eventType: value[1].eventType,
            cb: instance[eventName]
          }
        }
      })
    }

    for (let event of events) {
      if (event) {
        eventManager.addListener(tags, event.eventType, event.cb);
      }
    }

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
