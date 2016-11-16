import window from 'global';
import hypermonkey from 'hypermonkey';
import App from '../browser/app';
import ServerApp from '../lib/app';
import pageHelper from './pageHelper';

describe('todos app', () => {
  var page, monkey;

  beforeEach(() => {
    monkey = hypermonkey()
      .withServer('http://localhost:1234', ServerApp)
      .withApp(router => new App({router: router}))
      .start();

    page = pageHelper(monkey.browser);
  });

  afterEach(() => monkey.stop());

  context('when user lands on "/"', () => {
    beforeEach(() => {
      window.history.pushState(null, null, '/');
    });

    it('allows user to fetch todos', async () => {
      await page.fetchTODOs();
      await page.observeLoadingBar();
      await page.expectTODOs('buy beer', 'call Dave', 'watch tv');
    });
  });

  context('when user lands on "/todos"', () => {
    beforeEach(() => {
      window.history.pushState(null, null, '/todos');
    });

    it('fetches todos automatically', async () => {
      await page.observeLoadingBar();
      await page.expectTODOs('buy beer', 'call Dave', 'watch tv');
    });
  });
});
