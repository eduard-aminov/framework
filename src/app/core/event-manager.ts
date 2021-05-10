const listeners = new WeakMap<object, Event[]>();

export class EventManager {
  constructor(private _listeners: WeakMap<object, Event[]>) {}

  setEvent(instance: object, event: Event): void {
    this._listeners.set(instance, [...this.getEvents(instance), event]);
  }

  getEvents(instance: object): Event[] {
    return this._listeners.get(instance);
  }

  addListener(elements: HTMLCollection, eventType: string, cb: EventListenerOrEventListenerObject): void {
    Array.from(elements).forEach(elem => {
      elem.addEventListener(eventType, cb);
    });
  }
}

export const eventManager = new EventManager(listeners);
