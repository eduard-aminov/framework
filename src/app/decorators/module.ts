import { Type } from '~/decorators/component';
import { injector } from '~/core/injector';
import { Metadata } from '~/core/enums/metadata';

export interface Module {
  declarations: Type<any>[];
}

export function Module(options: Module) {
  return function <T>(constructor: Type<T>): Type<T> {
    constructor.prototype[Metadata.Annotations] = options;
    options.declarations.forEach((constructor) => {
      injector.setDependency(constructor, injector.instantiateDependency(constructor));
    });
    return constructor;
  };
}
