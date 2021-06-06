const puppeteer = require("puppeteer");

//입력 할 텍스트
const insert_name = "insert_" + Math.random().toString(36).substring(2, 15);
const insert_description =
  "insert_" + Math.random().toString(36).substring(2, 15);

//수정 할 텍스트
const modi_name = "update_" + Math.random().toString(36).substring(2, 15);
const modi_description =
  "update_" + Math.random().toString(36).substring(2, 15);

async function run() {
  // 브라우저 열기
  // headless 설정
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 아래 url에 해당하는 웹사이트가 크롬브라우저를 통해 구현된다
  // 네이버 코스피 지수 가져오기
  await page.goto(
    "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%BD%94%EC%8A%A4%ED%94%BC&oquery=%EC%BD%94%EC%8A%A4%ED%94%BC%EC%A7%80%EC%88%98&tqi=h7yjXsp0JXVss4tSsWGssssssqN-313383",
    {
      timeout: 0,
      waitUntil: "domcontentloaded",
    }
  );

  // 상단 테이블의 th 제목을 가져오고 싶은경우
  // 네이버 코스피 지수 가져오기
  // tag 경로를 입력, 해당 tag를 변수화
  const tdName = await page.$eval(".spt_con strong", (strong) =>
    strong.textContent.trim()
  );
  console.log(tdName);

  // 브라우저 닫기
  await browser.close();
}

run();
