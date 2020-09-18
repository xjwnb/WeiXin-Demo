// compare/compare.js
Page({
  // 初始定义 data 内容
  data: {
    result: '',
    colorStyle: ''
  },
  formCompare: function(e) {
    console.log(e)
    var result = ''
    var colorStyle = ''
    var num1 = Number(e.detail.value.num1)
    var num2 = Number(e.detail.value.num2)
    // 三元判断
    // 判断 num1 和 num2是否相等
    num1 === num2
    ?
    // num1 num2 两数相等则执行
    (result = '两个数字相等')
    &&
    (colorStyle = 'blue')
    :
    // 不相等有两种情况
    (
      // 1) num1 > num2 的情况
      num1 > num2
      ?
      // num1 > num2 则执行
      (result = '第一个数大')
      &&
      (colorStyle = 'green')
      :
      // 2) num1 < num2 则执行
      (result = '第二个数字大')
      &&
      (colorStyle = 'pink')
    )

    // 修改 data中的 result 和colorStyle 
    this.setData({
      // 由于ES6 语法(喜欢偷懒)
      // result 相当于 result: result
      result,
      colorStyle
    })

  }
})