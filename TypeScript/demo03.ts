// enum 枚举

enum REN {
  nan,
  nv,
  yao
}

console.log(REN.yao) // 2

enum REN2 {
  nan = '男人',
  nv = '女人',
  yao = '妖'
}
console.log(REN2.yao) // 妖

// any类型 类型可以随便转换

var t: any = 'shenzjd'
t = 10

console.log(t)

console.log('----------------------')

// 函数  返回的字符串类型
// 可选参数 age?:number
// 默认参数 age:number=18
function serachXiaojiejie(age: number): string {
  return `找到了${age}岁的小姐姐`
}

var age: number = 18

var result: string = serachXiaojiejie(age)

console.log(result)
