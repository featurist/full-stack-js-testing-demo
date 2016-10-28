import { expect } from 'chai';

export default function(browser) {
  var $ = browser.get('$');

  return browser.component({
    fetchTODOs: function() {
      return this.find('button').click();
    },

    observeLoadingBar: function() {
      return this.find('.loading', {text: 'Loading...'}).shouldExist();
    },

    expectTODOs: async function(...expectedTodos) {
      var actualTodos = (await this.find('ul li').elements())
        .map(e => $(e).innerText());

      expect(actualTodos.sort()).to.eql(expectedTodos.sort());
    }
  });
}
