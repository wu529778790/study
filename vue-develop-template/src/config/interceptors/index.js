/* 拦截器入口文件
 * @Author: wu529778790 
 * @Date: 2018-06-20 15:44:17 
 * @Last Modified by: wu529778790
 * @Last Modified time: 2018-06-20 15:44:37
 */

import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from './axios';

import { routerBeforeEachFunc } from './router';

export default {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc,
  routerBeforeEachFunc
};
