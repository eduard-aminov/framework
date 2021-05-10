import { Metadata } from '~/core/enums/metadata';

export interface EventMetadata {
  [key: string]: {
    eventType: string,
    args: any
  }
}

export function HostListener<T>(eventType: string): (target: object, propName: string) => void {
  return function(target: object, propName: string): void {
    target.constructor.prototype[Metadata.PropMetadata] = {
      ...target.constructor.prototype[Metadata.PropMetadata],
      [propName]: {
        eventType,
        args: undefined
      }
    };
  }
}

