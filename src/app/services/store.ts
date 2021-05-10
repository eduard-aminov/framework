import { Injectable } from '~/core/injector';

@Injectable
export class StoreService {
  private _store = {
    name: 'eduard',
    age: 23,
    isProgrammer: true
  };

  get name(): string {
    return this._store.name;
  }

  set name(name: string) {
    this._store = Object.assign(this._store, name);
  }

  get age(): number {
    return this._store.age;
  }

  set age(age: number) {
    this._store = Object.assign(this._store, age);
  }

  get isProgrammer(): boolean {
    return this._store.isProgrammer;
  }

  set isProgrammer(isProgrammer: boolean) {
    this._store = Object.assign(this._store, isProgrammer);
  }
}
