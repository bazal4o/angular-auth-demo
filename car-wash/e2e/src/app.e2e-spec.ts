import { AppPage } from './app.po';

describe('car-wash App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display project name in navigation', () => {
    page.navigateTo();
    expect(page.getNavText()).toEqual('car-wash');
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getWelcomeText()).toEqual('Welcome to Ignite UI for Angular!');
  });
});
