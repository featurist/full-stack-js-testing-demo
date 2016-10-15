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
      return this.find('div', {text: 'Loading...'});
    },

    expectTODOs: async function(...expectedTodos) {
      var actualTodos = (await this.find('ul li').elements())
        .map(e => e.innerText);

      expect(actualTodos.sort()).to.eql(expectedTodos.sort());
    }
  });

  beforeEach(() => {
    window.location.hash = '';

    mountApp(new App({
      api: fakeApi,
      routerOptions: {history: router.hash},
    }));
  });

  it('fetches todos', async () => {
    await page.fetchTODOs();
    await page.observeLoadingBar();
    await page.expectTODOs('one', 'two');
  });
});
