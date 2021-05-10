import 'reflect-metadata';
import { Type } from '~/decorators/component';
import { dependencies, injector } from '~/core/injector';
import { render } from '~/core/renderer';

export interface Module {
  declarations: Type<any>[];
  // providers: Type<any>[];
}

export function Module(options: Module) {
  return function <T>(Constructor: Type<T>): Type<T> {
    Constructor.prototype.__annotations__ = options;
    // options.providers.forEach((constructor) => {
    //   injector.setDependency(constructor, injector.instantiateDependency(constructor));
    // });
    options.declarations.forEach((constructor) => {
      injector.setDependency(constructor, injector.instantiateDependency(constructor));
    });
    return Constructor;
  };
}
