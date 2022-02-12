import { randomString } from "../mod.ts";

export interface Listener<EventType> {
  id: string;
  type: EventType;
  listener: (...args: any) => void;
}

export type EventsMap<EventType extends string> = Record<EventType, any[]>;

export class EventsManager<
  EventType extends string = string,
  MappedEvents extends EventsMap<EventType> = EventsMap<EventType>,
> {
  private listeners: Listener<EventType>[] = [];

  addEventListener<Type extends EventType>(
    type: Type,
    listener: (...args: MappedEvents[Type]) => void,
  ) {
    const id = randomString("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 10);
    this.listeners.push({
      id,
      type,
      listener,
    });
    return () => {
      this.listeners = this.listeners.filter((v) => v.id !== id);
    };
  }
  dispachEvent<Type extends EventType>(type: Type, ...args: MappedEvents[Type]) {
    this.listeners.forEach((v) => (v.type === type ? v.listener(...args) : null));
  }
}
