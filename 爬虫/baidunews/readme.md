```
const express = require('express');
const app = express();
const superagent = require('superagent');

let hotNews = []; // 热点新闻
let localNews = []; // 本地新闻

/**
 * 使用superagent.get()方法来访问百度新闻首页
 */

superagent.get('http://news.baidu.com/').end((err, res) => {
  if (err) {
    // 如果访问失败或出错
    console.log(`热点新闻获取失败-${err}`);
  } else {
    // 访问成功，请求http://news.baidu.com/页面所返回的数据包含在res
    // 抓取热点新闻数据
    hotNews = getHotNews(res);
  }
});

/**
 * 抓取热点新闻页面
 */
const cheerio = require('cheerio');
let getHotNews = res => {
  let hotNews = [];
  // 访问成功，请求百度新闻页面所返回的数据会包含在res.text中

  /**
   * 使用cheerio模块的cheerio.load()方法，将htmldocument作为参数传入函数
   * 以后就可以使用类似jQuery的方式来获取页面元素
   */

  let $ = cheerio.load(res.text);

  // 找到目标元素的页面元素，获取数据
  $('div#pane-news ul li a').each((index, element) => {
    let news = {
      title: $(element).text(),
      href: $(element).attr('href')
    };
    hotNews.push(news);
  });
  return hotNews;
};

/**
 * [description] - 跟路由
 * app.get('', async() => {})接受两个参数，第一个参数接受一个String类型的路由路径，
 * 表示Ajax的请求路径。第二个参数接受一个函数Function，当请求此路径时就会执行这个函数中的代码。
 */
// 当一个get请求 http://localhost:3000时，就会后面的async函数

app.get('/', async (req, res, next) => {
  res.send(hotNews);
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('your app is running at http://%s:%s', host, port);
});
/**
 * 这里要多说几点：async/await据说是异步编程的终级解决方案,它可以让我们以同步的思维方式来进行异步编程。
 * Promise解决了异步编程的“回调地狱”，
 * async/await同时使异步流程控制变得友好而有清晰，有兴趣的同学可以去了解学习一下，真的很好用。
 * superagent模块提供了很多比如get、post、delte等方法，可以很方便地进行Ajax请求操作。
 * 在请求结束后执行.end()回调函数。
 * .end()接受一个函数作为参数，该函数又有两个参数error和res。当请求失败，error会包含返回的错误信息，
 * 请求成功，error值为null，
 * 返回的数据会包含在res参数中。cheerio模块的.load()方法，将HTML document作为参数传入函数，
 * 以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素。
 * 同时可以使用类似于jQuery中的.each()来遍历元素。此外，还有很多方法，大家可以自行Google/Baidu。
 */

// https://webcaolixin.github.io/2018/06/08/news-spider/#more
```
