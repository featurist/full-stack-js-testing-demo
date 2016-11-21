import { expect } from 'chai';

export default function(browser) {
  var $ = browser.get('$');

  return browser.component({
    fetchTODOs() {
      return this.find('button').click();
    },

    observeLoadingBar() {
      return this.find('.loading', {text: 'Loading...'}).shouldExist();
    },

    async expectTODOs(...expectedTodos) {
      var actualTodos = (await this.find('ul li').elements())
        .map(e => $(e).innerText());

      expect(actualTodos.sort()).to.eql(expectedTodos.sort());
    }
  });
}
