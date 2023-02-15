const { Browser } = require("puppeteer");
const {
  clickElement,
  putText,
  getText,
  getDays,
  getMovieTime,
  getSeatSelector,
} = require("./lib/commands.js");
const {
  bookTickets,
  selectedTickets,
  getBookingCode,
} = require("./lib/selectors");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Film booking tests", () => {
  test("Should book available ticket", async () => {
    await getDays(page, 10);
    await getMovieTime(page, 2, 2);
    await getSeatSelector(page, 1, 2);
    await clickElement(page, bookTickets);
    await page.waitForSelector(selectedTickets);
    await clickElement(page, getBookingCode);
    const actual = await getText(page, selectedTickets);

    expect(actual).toContain("Электронный билет");
  });

  test("Should wo tickets be booked", async () => {
    await getDays(page, 10);
    await getMovieTime(page, 2, 2);
    await getSeatSelector(page, 1, 7);
    await getSeatSelector(page, 1, 8);
    await clickElement(page, bookTickets);
    await page.waitForSelector(selectedTickets);
    await clickElement(page, getBookingCode);
    const actual = await getText(page, selectedTickets);

    expect(actual).toContain("Электронный билет");
  });

  test("Should try to book unavailable ticket", async () => {
    await getDays(page, 10);
    await getMovieTime(page, 2, 2);
    await getSeatSelector(page, 1, 5);
    expect(
      await page.$eval("button", (button) => {
        return button.disabled;
      })
    ).toBe(true);
  });
});
