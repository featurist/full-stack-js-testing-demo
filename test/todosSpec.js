import browser from 'browser-monkey';
import { expect } from 'chai';
import mountApp from './mountApp';
import App from '../browser/app';

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
    var fakeApi = {};
    fakeApi.loadTODOs = () => {
      return new Promise(function(resolve) {
        setTimeout(() => {
          resolve([{title: 'one'}, {title: 'two'}]);
        }, 50);
      });
    }

    mountApp(new App(fakeApi));
  });

  it('fetches todos', async () => {
    await page.fetchTODOs();
    await page.observeLoadingBar();
    await page.expectTODOs('one', 'two');
  });
});
