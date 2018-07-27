const Koa = require('koa');
const app = new Koa();
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
let data = [];

superagent
  .get('http://vip.iqiyi.com/hot.html?cid=1')
  .set(
    'User-Agent',
    'Mozilla/5.0 (X11; U; Linux i686; zh-CN; rv:1.9.1.2) Gecko/20090803'
  )
  .end((err, res) => {
    if (err) {
      // 如果访问失败或出错
      console.log(`获取失败-${err}`);
    } else {
      // 访问成功
      data = handleRes(res);
    }
  });
/**
 *
 * @param {处理抓取的页面} res
 */
let handleRes = res => {
  let $ = cheerio.load(res.text);
  // console.log($('.site-piclist_pic_link')[0]);
  $('.site-piclist_pic_link').each((index, element) => {
    let list = {
      index: ++index,
      title: $(element).attr('title'),
      href: $(element).attr('href'),
      url: `http://vip.jlsprh.com/index.php?url=${$(element).attr('href')}`
    };
    data.push(list);
  });
  return data;
};

function saveToFile(data) {
  let str = JSON.stringify(data);
  fs.writeFile('./data.json', str, { flag: 'w+' }, err => {
    if (err) console.log(err);
  });
}

app.use(async (ctx, next) => {
  ctx.body = data;
  saveToFile(data);
});

app.listen(3000, () => {
  console.log('starting at 3000');
});
