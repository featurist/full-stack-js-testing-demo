import window from 'global';
import hypermonkey from 'hypermonkey';
import router from 'hyperdom-router';
import App from '../browser/app';
import ServerApp from '../lib/app';
import pageHelper from './pageHelper';
import vinehill from 'vinehill';

describe('todos app', () => {
  var page;

  beforeEach(() => {
    vinehill.setOrigin('http://localhost:1234');
    vinehill('http://localhost:1234', ServerApp);
    router.start();
    var browser = hypermonkey(new App({router: router}));
    page = pageHelper(browser);
  });

  afterEach(() => router.clear());

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
