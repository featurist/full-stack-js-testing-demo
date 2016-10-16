import browser from 'browser-monkey';
import router from 'plastiq-router';
import { expect } from 'chai';
import mountApp from './mountApp';
import App from '../browser/app';
import fakeApi from './fakeApi';

describe('todos app', () => {
  var page = browser.component({
    fetchTODOs: function() {
      return this.find('button').click();
    },

    observeLoadingBar: function() {
      return this.find('.loading', {text: 'Loading...'}).shouldExist();
    },

    expectTODOs: async function(...expectedTodos) {
      var actualTodos = (await this.find('ul li').elements())
        .map(e => e.innerText);

      expect(actualTodos.sort()).to.eql(expectedTodos.sort());
    }
  });

  beforeEach(() => {
    router.start({history: router.hash});
    window.location.hash = '';

    mountApp(new App({
      api: fakeApi,
      router: router
    }));
  });

  afterEach(() => {
    router.clear();
  });

  it('allows user to fetch todos', async () => {
    await page.fetchTODOs();
    await page.observeLoadingBar();
    await page.expectTODOs('one', 'two');
  });

  context('when user lands on "/todos"', () => {
    beforeEach(() => {
      window.location.hash = 'todos';
    });

    it('fetches todos automatically', async () => {
      await page.observeLoadingBar();
      await page.expectTODOs('one', 'two');
    });
  });
});
