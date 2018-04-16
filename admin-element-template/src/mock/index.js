/*
 * 数据模拟
 * @Author: liangzc 
 * @Date: 2018-04-13 17:53:50 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:53:50 
 */
import Mock from 'mockjs';

// 获取 mock.Random 对象
const Random = Mock.Random;

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/service\/login/, 'post', {
  //登录
  ret: 0,
  data: {
    name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    createTime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    uid: Random.guid(),
    id: Random.id()
  }
});

Mock.mock(/service\/getUserAndRole/, 'post', {
  //获取用户角色
  ret: 0,
  data: {
    userInfo: {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      createTime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      uid: Random.guid(),
      id: Random.id()
    },
    role: {
      name: 'admin',
      permission: 'ALL'
    }
  }
});
