/*
 * 商户管理路由
 * @Author: liangzc 
 * @Date: 2018-04-13 17:55:33 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:55:33 
 */
export default {
  path: 'merchant',
  component: 'common/index',
  meta: {
    title: '商户管理',
    icon: 'el-icon-document',
    menu: true
  },
  children: [
    {
      path: 'list',
      component: 'merchant/list',
      meta: {
        title: '商户列表',
        menu: true
      }
    }
  ]
};
