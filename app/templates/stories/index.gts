import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

export default Route<{ model: any }>(
  <template>
    {{pageTitle "Stories"}}

    {{log @model}}

    {{outlet}}
  </template>
);
