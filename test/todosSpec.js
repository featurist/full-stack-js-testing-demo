import browser from 'browser-monkey';
import { expect } from 'chai';
import mountApp from './mountApp';
import App from '../browser/app';

describe('todos app', () => {
  var page = browser.component({
    fetchTODOs: function() {
      return this.find('button').click();
    },
    expectTODOs: async function(...expectedTodos) {
      var actualTodos = (await this.find('ul li').elements()).map(e => e.innerText);
      expect(actualTodos.sort()).to.eql(expectedTodos.sort());
    }
  });

  beforeEach(() => {
    var api = {};
    api.loadTODOs = () => Promise.resolve([{title: 'one'}, {title: 'two'}]);

    mountApp(new App(api));
  });

  it('fetches todos', async () => {
    await page.fetchTODOs();
    await page.expectTODOs('one', 'two');
  });
});
