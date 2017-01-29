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

    const browser = mountApp(new App({api}));
    page = pageHelper(browser);
  });

  context('when user lands on "/"', () => {
    beforeEach(() => {
      window.history.pushState(null, null, '/');
    });

    it('allows user to fetch todos', async () => {
      await page.fetchTODOsButton().click();
      await page.loadingBar().shouldExist();
      await page.expectTODOs('one', 'two');
    });
  });

  context('when user lands on "/todos"', () => {
    beforeEach(() => {
      window.history.pushState(null, null, '/todos');
    });

    it('fetches todos automatically', async () => {
      await page.loadingBar().shouldExist();
      await page.expectTODOs('one', 'two');
    });
  });
});
