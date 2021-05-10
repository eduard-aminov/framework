import 'reflect-metadata';
import { Type } from '~/decorators/component';

type Dependency<T> = { instance: T | null };

export const dependencies = new WeakMap<Type<any>, Dependency<any>>();

export class Injector {
  constructor(private _dependencies: WeakMap<Type<any>, Dependency<any>>) {}

  getDependency<T>(constructor: Type<T>): T | undefined {
    const dependency = this._dependencies.get(constructor);

    // console.log('dependency', dependency);

    if (!dependency) {
      throw new Error(`Не удалось найти сервис с именем [${constructor.name}]`);
    }

    if (!dependency.instance) {
      return this.instantiateDependency(constructor);
    }

    return dependency.instance;
  }

  setDependency<T>(constructor: Type<T>, dependency: T): void {
    this._dependencies.set(constructor, {
      instance: dependency ?? null
    });
  }

  getDependencies<T>(constructor: Type<T>): Dependency<T>[] | undefined {
    const types = this._getTypes('paramtypes', constructor);

    // console.log('types', types);

    if (!types) {
      return undefined;
    }

    return types.map(this.getDependency.bind(this));
  }

  instantiateDependency<T>(constructor: Type<T>): T {
    // console.log('dependencies', this._dependencies);
    // console.log('constructor', constructor);
    // console.log(constructor + ' has', this._dependencies.has(constructor));

    const constructorArgs = this.getDependencies(constructor);

    // console.log('constructorArgs', constructorArgs);

    if (constructorArgs) {
      return new constructor(...constructorArgs);
    }
    return new constructor();
  }

  private _getTypes<T>(design: string, constructor: Type<T>): Type<any>[] {
    return Reflect.getOwnMetadata(`design:${design}`, constructor);
  }
}

export const injector = new Injector(dependencies);

export function Injectable<T>(constructor: Type<T>): void {
  injector.setDependency(constructor, null);
}
