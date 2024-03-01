import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    const stories = await import.meta.glob('/stories/*');
    return stories;
  }
}
