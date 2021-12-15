const Page = require('./helper/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('the header has the correct text', async () => {
  //const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);
  const text = await page.getContentsOf('a.brand-logo');
  expect(text).toEqual('Blogster');
});

test('clicking login button starts OAuth flow', async () => {
  await page.click('.right a');
  const url = page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test('after logged in , show logout button', async () => {
  await page.login();
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
  expect(text).toEqual('Logout');
});
