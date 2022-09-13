import puppeteer from "puppeteer";

export async function crawler() {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  console.log("excute crawlerCoffee");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);
  let nameList = [];
  let imgList = [];
  for (let i = 1; i <= 10; i++) {
    nameList.push(
      await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dd`,
        (el) => el.textContent
      )
    );
    imgList.push(
      await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dt > a > img`,
        (el) => el.getAttribute("src")
      )
    );
  }

  browser.close();
  const list = [];
  list.push(nameList);
  list.push(imgList);
  return list;
}
