import { GiryaManagementPage } from './app.po';

describe('girya-management App', () => {
  let page: GiryaManagementPage;

  beforeEach(() => {
    page = new GiryaManagementPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
