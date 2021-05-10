import { bootstrapApp } from '~/app';
import 'zone.js';
import 'reflect-metadata';
import { AppModule } from '~/components/app/app.module';

bootstrapApp(AppModule);

// const myZone = Zone.current.fork({
//   name: 'My first Zone',
//   onInvoke(parentZoneDelegate, _, targetZone, delegate, applyThis, applyArgs, source) {
//     console.log('мы где-то вызвали метод `run`');
//
//     return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
//   }
// });
//
// console.log(myZone);
//
// myZone.run(() => {
//   console.log('привет из коллбека');
// });
