let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain(" Get started with Team");
  }, 6000);
});

test("The page Marketplace", async () => {
  await page.goto("https://github.com/marketplace");
  await page.waitForSelector("h1");
  const title3 = await page.title();
  expect(title3).toEqual(
    "GitHub Marketplace · to improve your workflow · GitHub"
  );
}, 50000);

test("The page pricing", async () => {
  await page.goto("https://github.com/pricing");
  await page.waitForSelector("h1");
  const title3 = await page.title();
  expect(title3).toEqual("Pricing · Plans for every developer · GitHub");
}, 50000);

test("The home for developer communities", async () => {
  await page.goto("https://github.com/features/discussions");
  await page.waitForSelector("h1");
  const title3 = await page.title();
  expect(title3).toEqual(
    "GitHub Discussions · The home for developer communities · GitHub"
  );
}, 50000);
