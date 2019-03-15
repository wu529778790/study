const Mock = require('mockjs')

Mock.mock('/api/todolist', 'get', {
    'code': 200,
    'data': {
        'list': ['Dell', 'Lee', 'IMOOC']
    },
    'message': '操作成功',
    'systemDate': new Date().getTime()
})
Mock.mock('/list', 'get', {
    'code': 200,
    'data': {
        'list': ['Dell', 'Lee', 'IMOOC']
    },
    'message': '操作成功',
    'systemDate': new Date().getTime()
})