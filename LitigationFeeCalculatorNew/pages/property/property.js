Page({
  // 初始化
  data: {
    fei: '',
    fei2: ''
  },

  // 计算处理函数
  formSubmit: function (e) {
    var a = Number(e.detail.value.input)
    var b = 0 //诉讼费
    var c = 0 // 减半
    // 诉讼费分阶计算
    if (a <= 10000) {
      b = 50
    } else if (a <= 100000 && a > 10000) {
      b = 0.025 * a - 200
    } else if (a <= 200000 && a >= 100000) {
      b = 0.02 * a + 300
    } else if (a <= 500000 && a > 200000) {
      b = 0.015 * a + 1300
    } else if (a <= 1000000 && a > 500000) {
      b = 0.01 * a + 3800
    } else if (a <= 2000000 && a > 1000000) {
      b = 0.009 * a + 4800
    } else if (a <= 5000000 && a > 2000000) {
      b = 0.008 * a + 6800
    } else if (a <= 10000000 && a > 5000000) {
      b = 0.007 * a + 11800
    } else if (a <= 20000000 && a > 10000000) {
      b = 0.006 * a + 21800
    } else if (a > 20000000) {
      b = 0.005 * a + 41800
    }
    // 减半诉讼费
    c = 0.5 * b
    // 显示计算结果
    this.setData({
      fei: b.toFixed(2),
      fei2: c.toFixed(2)
    })
  },
  // 重置
  formReset: function () {
    this.setData({
      fei: '',
      fei2: ''
    })
  }
})