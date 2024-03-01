import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import type { ServiceFactory } from 'ember-polaris-service';
import { getScope, lookup } from 'ember-polaris-service';

import type { ConstructService, LifecycleBuilder } from './types.js';

export class Builder<StateBucket extends object> implements LifecycleBuilder {
  readonly #state: StateBucket;

  constructor(state: StateBucket) {
    this.#state = state;
  }

  on = {
    cleanup: (fn: () => void): void => {
      registerDestructor(this.#state, fn);
    },
  };

  service = <T>(service: ConstructService<T>): T => {
    const scope = getScope(this.#state);
    assert(`a modifier must be installed in a scope`, scope);
    return lookup(scope, service as unknown as ServiceFactory<T>);
  };
}
