const puppeteer = require("puppeteer");

//입력 할 텍스트
//난수가 입력됨
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
  await page.goto("http://localhost:3000/", {
    timeout: 0,
    waitUntil: "domcontentloaded",
  });

  //[DATA CREATE]
  //localhost의 작성하기 버튼이 나타날때까지 기다리고
  await page.waitForSelector(".btn-default");
  //그 버튼을 누른다(해당 tag 입력)
  await page.click(".btn-default");
  //버튼을 누르고, 작성하기 버튼이 나타날때까지 기다리고
  await page.waitForSelector(".btn-primary");
  //a, b가 입력된다
  //즉 insert_name 변수와 insert_description 변수를 넣어준다
  //함수 끝에서 넣어줄 인자를 정해줬음
  //해당 data가 저장되는 변수를 설정해줌..tag[name=그 변수]
  await page.evaluate(
    (a, b) => {
      document.querySelector("input[name=name]").value = a;
      document.querySelector("textarea[name=description]").value = b;
      //그 후 클릭
      document.querySelector(".btn-primary").click();
    },
    insert_name,
    insert_description
  );

  //[DATA MODIFIY]
  //일단 작성하기버튼이 나타날때까지 기다리고
  await page.waitForSelector(".btn-default");
  //go to 상세페이지(CSS문법)_두번째의 첫번째 부분을 클릭
  await page.click("table tr:nth-child(2) td:nth-child(1) a");

  // 브라우저 닫기
  //await browser.close();
}

run();
