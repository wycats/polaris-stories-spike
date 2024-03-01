import Service from 'ember-polaris-service';
import { TrackedMap } from 'tracked-built-ins';

export default class ElementSet extends Service {
  readonly #map = new TrackedMap<Element, string>();

  *[Symbol.iterator](): IterableIterator<string> {
    for (const id of this.#map.values()) {
      yield id;
    }
  }

  add(element: Element, id: string): void {
    this.#map.set(element, id);
  }

  remove(element: Element): void {
    this.#map.delete(element);
  }

  has(element: Element): boolean {
    return this.#map.has(element);
  }
}
