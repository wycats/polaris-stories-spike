import type { Scope } from 'ember-polaris-service';

export type AnyModifierFn<
  E extends Element = Element,
  A extends Record<string, unknown> = Record<string, unknown>,
> = (element: E, args: A) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => unknown;

export type ModifierFactory<
  E extends Element = Element,
  A extends Record<string, unknown> = Record<string, unknown>,
> = (builder: LifecycleBuilder) => ModifierFn<E, A>;

export interface LifecycleBuilder {
  readonly on: {
    cleanup: (fn: () => void) => void;
  };
  readonly service: <const T>(service: new (scope: Scope) => T) => T;
}

export type ModifierFn<E extends Element, A extends Record<string, unknown>> = (
  element: E,
  args: A
) => void;

export interface ModifierSignature {
  readonly element: Element;
  readonly args: Record<string, unknown>;
}

export type ConstructService<T> = new (scope: Scope) => T;
