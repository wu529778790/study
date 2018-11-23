"use strict";
// enum 枚举
var REN;
(function (REN) {
    REN[REN["nan"] = 0] = "nan";
    REN[REN["nv"] = 1] = "nv";
    REN[REN["yao"] = 2] = "yao";
})(REN || (REN = {}));
console.log(REN.yao); // 2
var REN2;
(function (REN2) {
    REN2["nan"] = "\u7537\u4EBA";
    REN2["nv"] = "\u5973\u4EBA";
    REN2["yao"] = "\u5996";
})(REN2 || (REN2 = {}));
console.log(REN2.yao); // 妖
// any类型 类型可以随便转换
var t = 'shenzjd';
t = 10;
console.log(t);
console.log('----------------------');
// 函数  返回的字符串类型
function serachXiaojiejie(age) {
    return "\u627E\u5230\u4E86" + age + "\u5C81\u7684\u5C0F\u59D0\u59D0";
}
var age = 18;
var result = serachXiaojiejie(age);
console.log(result);
