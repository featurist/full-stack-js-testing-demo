import router from 'plastiq-router';
import browser from 'browser-monkey';
import { expect } from 'chai';
import App from '../browser/app';
import mountAppAndVisit from './mountApp';
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

  beforeEach(() => router.start());
  afterEach(() => router.clear());

  context('when user lands on "/"', function () {
    beforeEach(() => {
      mountAppAndVisit(new App({api: fakeApi, router: router}), '/');
    });

    it('allows user to fetch todos', async () => {
      await page.fetchTODOs();
      await page.observeLoadingBar();
      await page.expectTODOs('one', 'two');
    });
  });

  context('when user lands on "/todos"', () => {
    beforeEach(() => {
      mountAppAndVisit(new App({api: fakeApi, router: router}), '/todos');
    });

    it('fetches todos automatically', async () => {
      await page.observeLoadingBar();
      await page.expectTODOs('one', 'two');
    });
  });
});
