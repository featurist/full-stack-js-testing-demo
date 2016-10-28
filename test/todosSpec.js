import router from 'plastiq-router';
import App from '../browser/app';
import mountApp from './mountApp';
import fakeApi from './fakeApi';
import pageHelper from './pageHelper';

describe('todos app', () => {
  var page;

  beforeEach(() => {
    router.start();
    var browser = mountApp(new App({api: fakeApi, router: router}));
    page = pageHelper(browser);
  });

  afterEach(() => router.clear());

  context('when user lands on "/"', () => {
    before(() => {
      window.history.pushState(null, null, '/');
    });

    it('allows user to fetch todos', async () => {
      await page.fetchTODOs();
      await page.observeLoadingBar();
      await page.expectTODOs('one', 'two');
    });
  });

  context('when user lands on "/todos"', () => {
    before(() => {
      window.history.pushState(null, null, '/todos');
    });

    it('fetches todos automatically', async () => {
      await page.observeLoadingBar();
      await page.expectTODOs('one', 'two');
    });
  });
});
