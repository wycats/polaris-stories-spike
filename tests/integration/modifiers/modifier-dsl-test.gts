import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { Modifier } from 'polaris-starter/lib/modifier';
import Service from 'ember-polaris-service';
import { TrackedArray, TrackedMap } from 'tracked-built-ins';
import { on } from '@ember/modifier';
import { getService } from 'polaris-starter/tests/helpers/owner-service';

module('Integration | Modifier()', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const list: string[] = new TrackedArray();

    const psh = () => {
      list.push(crypto.randomUUID());
    };

    const pop = () => {
      list.pop();
    };

    const keyValue = getService(KeyValueService);

    await render(
      <template>
        <button id="push" {{on "click" psh}}>push prefix</button>
        <button id="pop" {{on "click" pop}}>pop prefix</button>

        {{#each list as |id|}}
          <div {{hello prefix=id}}></div>
        {{/each}}

        <ul>
          {{#each keyValue.keys as |k|}}
            <li data-key={{k}}>{{k}}</li>
          {{/each}}
        </ul>
      </template>
    );

    assert.dom('div').doesNotExist();

    await click('button#push');
    verifyKeys();

    await click('button#push');
    verifyKeys();

    await click('button#pop');
    verifyKeys();

    function verifyKeys() {
      const keys = keyValue.keys;

      for (const key of keys) {
        assert.dom(`li[data-key="${key}"]`).exists();

        const found = list.find((id) => key.startsWith(id));
        assert.ok(found);
      }
    }
  });
});

class KeyValueService extends Service {
  #items = new TrackedMap<string, Element>();

  get items() {
    return this.#items;
  }

  get keys(): string[] {
    return [...this.#items.keys()];
  }

  delete(key: string) {
    this.#items.delete(key);
  }

  set(key: string, value: Element) {
    this.#items.set(key, value);
  }

  get(key: string) {
    return this.#items.get(key);
  }
}

const hello = Modifier(({ on, service }) => {
  return (element: Element, { prefix }: { prefix: string }) => {
    const kv = service(KeyValueService);
    const id = crypto.randomUUID();
    kv.set(`${prefix}-${id}`, element);

    on.cleanup(() => {
      kv.delete(`${prefix}-${id}`);
    });
  };
});
