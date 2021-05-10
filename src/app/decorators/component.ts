import { dependencies, injector } from '~/core/injector';

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface TypeDecorator {
  <T extends Type<any>>(type: T): T;
}

export interface Component {
  selector: string;
  template: string;
}

export interface ComponentDecorator {
  (obj: Component): TypeDecorator;

  new (obj: Component): Component;
}

export function Component(config: Component): (Constructor: Type<object>) => any {
  return function <T extends Type<object>>(Constructor: Type<object>) {
    Constructor.prototype.__annotations__ = config;
  };
}
