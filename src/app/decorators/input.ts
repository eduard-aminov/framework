import { Metadata } from '~/core/enums/metadata';

export interface PropsMetadata {
  [key: string]: null
}

export function Input(target: object, propName: string): void {
  target.constructor.prototype[Metadata.PropMetadata] = {
    ...target.constructor.prototype[Metadata.PropMetadata],
    [propName]: null
  };
}
