import EmberRouter from '@ember/routing/router';
import config from 'polaris-starter/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('stories', { path: '__stories__' }, function () {
    this.route('story', { path: ':story' });
    this.route('index', { path: '' });
  });
});
