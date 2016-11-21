import router from 'plastiq-router';
import App from '../browser/app';
import mountApp from './mountApp';
import createApi from './fakeApi';
import pageHelper from './pageHelper';

describe('todos app', () => {
  let page, api;

  beforeEach(() => {
    api = createApi();
    api.respond({
      to: 'loadTODOs',
      withData: [
        {title: 'one'},
        {title: 'two'}
      ]
    });

    router.start();
    const browser = mountApp(new App({api, router}));
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
