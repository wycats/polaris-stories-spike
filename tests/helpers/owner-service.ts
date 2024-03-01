import type Owner from '@ember/owner';
import type { Scope, ServiceFactory } from 'ember-polaris-service';
import { service as lookupService } from 'ember-polaris-service';

interface CurrentWithEnvironment {
  testEnvironment: {
    owner: Owner;
  };
}

// export declare function service<S extends
// ServiceConstructor<unknown>>(scopable: object, factory: S): InstanceType<S>;
export type ServiceConstructor<T = unknown> = ServiceFactory<T> & {
  new (scope: Scope): T;
};

export function getService<const S extends ServiceConstructor>(service: S): InstanceType<S> {
  const test = QUnit.config.current as CurrentWithEnvironment;

  return lookupService(test.testEnvironment, service) as InstanceType<S>;
}
