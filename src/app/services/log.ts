import { Injectable } from '~/core/injector';

@Injectable
export class LogService {
  log(message: string): void {
    console.log(message);
  }
}
