import { destroy } from '@ember/destroyable';
import type { ModifierManager } from '@ember/modifier';
import { capabilities, setModifierManager } from '@ember/modifier';
import type Owner from '@ember/owner';
import { setOwner } from '@ember/owner';
import type { Arguments } from '@glimmer/interfaces';
import type { ModifierLike } from '@glint/template';

import { Builder } from './builder.js';
import type { AnyModifierFn, ModifierFactory, ModifierSignature } from './types.js';

interface MyStateBucket {
  fn: AnyModifierFn;
}

export default class MyModifierManager implements ModifierManager<MyStateBucket> {
  capabilities = capabilities('3.22');

  readonly #owner: Owner;

  constructor(owner: Owner) {
    this.#owner = owner;
  }

  createModifier(factory: ModifierFactory): MyStateBucket {
    const state = {} as Partial<MyStateBucket>;
    setOwner(state, this.#owner);

    const fn = factory(new Builder(state));

    state.fn = fn;
    return state as MyStateBucket;
  }

  installModifier(state: MyStateBucket, element: Element, args: Arguments): void {
    const { fn } = state;

    fn(element, args.named);
  }

  updateModifier(_state: MyStateBucket, _args: Arguments): void {
    // do nothing
  }

  destroyModifier(state: MyStateBucket, _args: Arguments): void {
    destroy(state);
  }
}

export function Modifier<const E extends Element, const A extends Record<string, unknown>>(
  modifier: ModifierFactory<E, A>
): Modifier<{ element: E; args: A }> {
  setModifierManager((owner) => new MyModifierManager(owner), modifier);

  return modifier as unknown as Modifier<{ element: E; args: A }>;
}

export type Modifier<S extends ModifierSignature> = abstract new () => InstanceType<
  ModifierLike<{
    Element: S['element'];
    Args: {
      Named: S['args'];
    };
  }>
>;
