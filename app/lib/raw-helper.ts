import { assert } from '@ember/debug';
import { capabilities, setHelperManager } from '@ember/helper';
import type Owner from '@ember/owner';
import { setOwner } from '@ember/owner';
import type { Arguments, HelperManagerWithValue } from '@glimmer/interfaces';
import type { HelperLike } from '@glint/template';

import { Builder } from './builder.js';
import type { AnyFn, LifecycleBuilder } from './types.js';

export function Helper<T, const F extends (builder: LifecycleBuilder) => (...args: any[]) => T>(
  factory: F
): HelperLike<{ Args: { Positional: Parameters<ReturnType<F>> }; Return: T }> {
  const helperFactory = {};

  setHelperManager((owner) => {
    assert(`a helper requires an owner`, owner);

    return {
      capabilities: capabilities('3.23', {
        hasValue: true,
        hasDestroyable: false,
      }),

      createHelper: (_, args) => {
        const state = {} as Partial<{ args: Arguments }>;
        const { getValue } = factory(new Builder(state));

        const helper = { args, getValue };
        setOwner(helper, owner as Owner);
        return helper;
      },

      getValue: (bucket) => {
        const args = [...bucket.args.positional, bucket.args.named];
        return bucket.getValue(...args);
      },
    } satisfies HelperManagerWithValue<{
      args: Arguments;
      getValue: AnyFn;
    }>;
  }, factory);

  return helperFactory as HelperLike<{ Args: { Positional: A }; Return: R }>;
}

export type HelperFactory<A extends unknown[] = unknown[], R = unknown> = (
  builder: LifecycleBuilder
) => (...args: A) => R;
