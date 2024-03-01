import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

export default Route(
  <template>
    {{pageTitle "Stories"}}

    <h1>Stories</h1>

    {{outlet}}
  </template>
);
