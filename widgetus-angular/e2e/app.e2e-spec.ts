import { WidgetusAngularPage } from './app.po';

describe('widgetus-angular App', () => {
  let page: WidgetusAngularPage;

  beforeEach(() => {
    page = new WidgetusAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
