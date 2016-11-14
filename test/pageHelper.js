import { expect } from 'chai';

export default function(browser) {
  return browser.component({
    fetchTODOs: function() {
      return this.find('button').click();
    },

    observeLoadingBar: function() {
      return this.find('.loading', {text: 'Loading...'}).shouldExist();
    },

    expectTODOs: function(...expectedTodos) {
      return this.find('ul li').shouldHave({text: expectedTodos, timeout: 2000});
    }
  });
}
