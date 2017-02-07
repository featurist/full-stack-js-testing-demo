const { expect } = require('chai')

module.exports = function(browser) {
  var $ = browser.get('$');

  return browser.component({
    fetchTODOsButton() {
      return this.find('button');
    },

    async expectTODOs(...expectedTodos) {
      var actualTodos = (await this.find('ul li').elements())
        .map(e => $(e).innerText());

      expect(actualTodos.sort()).to.eql(expectedTodos.sort());
    }
  });
}
