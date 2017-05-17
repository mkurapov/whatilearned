import { WhatilearnedPage } from './app.po';

describe('whatilearned App', () => {
  let page: WhatilearnedPage;

  beforeEach(() => {
    page = new WhatilearnedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
