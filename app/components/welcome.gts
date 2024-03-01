import Component from '@glimmer/component';
import { Clock } from './clock';
import { Excite } from './excite';
import logElement from 'polaris-starter/modifiers/log-element';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import ElementSet from 'polaris-starter/services/element-set';
import { service } from 'ember-polaris-service';
import { TrackedArray } from 'tracked-built-ins';

class Welcome extends Component {
  list: string[] = new TrackedArray();
  elementSet = service(this, ElementSet);

  push = () => {
    this.list.push(crypto.randomUUID());
  };

  pop = () => {
    this.list.pop();
  };

  <template>
    <Excite />
    <Header />
    <main>
      <button type="button" {{on "click" this.push}}>
        Push Item
      </button>

      <button type="button" {{on "click" this.pop}}>
        Pop Item
      </button>

      <h2>Local IDs</h2>
      {{#each this.list as |id|}}
        <div {{logElement id=id}}>{{id}}</div>
      {{/each}}

      <h2>Service IDs</h2>
      {{#each this.elementSet as |id|}}
        <div>{{id}}</div>
      {{/each}}

      <div class="title">
        <h2>Learning Resources</h2>
        <aside>The time is <span>{{Clock}}</span></aside>
      </div>

      <Links />

      <Footer />
    </main>
  </template>
}

export default Welcome;

const Header = <template>
  <header>
    <img
      src="/images/logo.png"
      width="50"
      height="50"
      alt="an unofficial polaris logo. a gold compass rose sits in a space setting with kaleidoscopic colors showing through the compass."
    />
    <h1>Welcome to Polaris</h1>
  </header>
</template>;

const Links = <template>
  <ul>
    <li>
      <a href="https://tutorial.glimdown.com">Tutorial</a>
      <span>Get familiar with Ember's new file format, programming patterns, paradigms, and new way
        of thinking about reactivity</span>
    </li>
    <li>
      <a href="https://github.com/NullVoxPopuli/ember-resources/tree/main/docs/docs">Docs: Resources</a>
      <span>Learn about the new reactivity primitive</span>
    </li>
    <li>
      <a href="https://github.com/jmurphyau/ember-truth-helpers">ember-truth-helpers</a>
      <span>Additional template helpers (coming soon to Ember.js)</span>
    </li>
    <li>
      <a href="https://typescript.org">TypeScript</a>
      <span>TypeScript always enabled, always optional</span>
    </li>
    <li>
      <a href="https://vitejs.dev/">Vite</a><span>* Coming soon by default</span>
    </li>
  </ul>

  <ul>
    <li>
      <a href="https://stackblitz.com/github/nullVoxPopuli/polaris-starter/tree/main">
        StackBlitz
      </a>
      <span> Try it on StackBlitz</span>
    </li>

    <li>
      <a href="https://stackblitz.com/github/nullVoxPopuli/polaris-starter/tree/monorepo">
        StackBlitz (mono-repo)
      </a>
      <span> Try the mono-repo version on StackBlitz</span>
    </li>

    <li>
      <a href="https://discord.gg/emberjs">Discord</a>
      <span>Join the community Discord</span>
    </li>
  </ul>
</template>;

const Footer = <template>
  <div class="footer">
    <a href="https://github.com/NullVoxPopuli/polaris-starter/tree/main" class="github">
      <img alt="" src="/images/github-logo.png" />
      Fork Starter Project on GitHub
    </a>
  </div>

  <Excite />
</template>;
