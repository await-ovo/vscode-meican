// const schedule = require('node-schedule');
// const job = schedule.scheduleJob(
//   { hour: 14, minute: 49, dayOfWeek: [new schedule.Range(1, 5)] },
//   function () {
//     console.log('Time for tea!');
//   },
// );

// const params = new url.URLSearchParams({
//   username: 'SZW589@sp.bj',
//   loginType: 'username',
//   password: '!Szw1qa2ws',
//   remember: true,
//   openId: '',
//   redirectUrl: '',
// });

const https = require('https');
// var axios = require('axios');
// var data =
//   'username=SZW589%40sp.bj&loginType=username&password=%21Szw1qa2ws&remember=true&openId=&redirectUrl=';

// var config = {
//   method: 'post',
//   url: 'https://meican.com/account/directlogin',
//   httpsAgent: new https.Agent({ rejectUnauthorized: false }),
//   headers: {
//     Accept:
//       ' text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     'Accept-Encoding': ' gzip, deflate, br',
//     'Accept-Language': ' en-US,en;q=0.9',
//     'Cache-Control': ' no-cache',
//     Connection: ' keep-alive',
//     'Content-Length': ' 99',
//     'Content-Type': ' application/x-www-form-urlencoded',
//     Host: ' meican.com',
//     Origin: ' https://meican.com',
//     Pragma: ' no-cache',
//     Referer: ' https://meican.com/login',
//     'sec-ch-ua':
//       ' " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
//     'sec-ch-ua-mobile': ' ?0',
//     'sec-ch-ua-platform': ' "macOS"',
//     'Sec-Fetch-Dest': ' document',
//     'Sec-Fetch-Mode': ' navigate',
//     'Sec-Fetch-Site': ' same-origin',
//     'Sec-Fetch-User': ' ?1',
//     'Upgrade-Insecure-Requests': ' 1',
//     'User-Agent':
//       ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
//   },
//   data: data,
// };

// axios(config)
//   .then(function (response) {
//     console.log(response.rawHeaders);
//     console.log(response.headers);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// let cookieStr = '';

// const params = new URLSearchParams({
//   username: 'SZW589@sp.bj',
//   loginType: 'username',
//   password: '!Szw1qa2ws',
//   remember: 'true',
//   openId: '',
//   redirectUrl: '',
// });

// fetch('https://meican.com/account/directlogin', {
//   method: 'POST',
//   body: params,
//   follow: 20,
//   insecureHTTPParser: true,
//   redirect: 'manual',
//   agent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
//   headers: {
//     Accept: '*/*',
//     'Content-Type': ' application/x-www-form-urlencoded',
//     Host: ' meican.com',
//     Origin: ' https://meican.com',
//     Referer: ' https://meican.com/login',
//   },
// })
//   .then(function (response) {
//     console.log(response.status, response.redirected);
//     response.text().then(s => console.log(s));
//     console.log(response.headers.raw());

//     for (const item of response.headers.raw()['set-cookie']) {
//       cookieStr += item;
//     }

//     console.log(`cookie str -->`, cookieStr);

//     console.log(`parsed cookie -->`);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const rc = `M_distinctid=17feb06423adbb-0819b6834fdddf-113f645d-1fa400-17feb06423baf5; cna=2d0ee86f25524d9e866a06ade47a73a4; machineId=4e8aaa25-93b7-46dd-8321-35bca1252c05; guestId=822560b9-1684-4382-873f-c72ec2ce11b9; __utmz=1.1648915538.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=1; CNZZDATA1259914292=1161505175-1648913502-%7C1649067898; __utma=1.1399811130.1648915538.1649058694.1649068459.4; __utmt=1; __utmb=1.1.10.1649068459; remember=5a80d8e07d2890c26e8c329a6acf929e465ecb66-7615132; PLAY_FLASH="from=null&success=%E7%99%BB%E5%BD%95%E6%88%90%E5%8A%9F"; PLAY_SESSION="13c2c352a3b5b211b4a29a706f227928ea5d7770-userId=7615132"`;

fetch(
  // `client_id=88&client_secret=5555`,
  `https://meican.com/preorder/api/v2.1/calendaritems/list?withOrderDetail=false&beginDate=2022-04-04&endDate=2022-03-31&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E`,
  // `https://meican.com/forward/api/v2.1/accounts/show?client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E`,
  // 'https://meican.com/forward/api/v2.1/accounts/show?client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E',
  // 'https://meican.com',
  {
    method: 'GET',
    // redirect: 'manual',
    insecureHTTPParser: true,
    agent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
    headers: {
      Accept: 'application/json',
      // Authorization: 'Bearer 6R6YGWWeKXe6wCkmN9QJbx18Dss0oAa',
      Cookie: rc,
    },
  },
).then(
  res => {
    // res.json().then(d => {
    //   console.log(`fetch api response \n`);
    //   console.log(d);
    // });
    console.log(res.headers);
    console.log(`status -->`, res.status);
    res.text().then(d => console.log(`text\n`, d));
  },
  err => {
    console.log(`fetch api error -->`, err);
  },
);
