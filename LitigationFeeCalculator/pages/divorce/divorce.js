Page({
  data: {
    fei3: 300,
    fei4: 150
  },

  // 事件处理函数
  switchChange: function(e) {
    this.setData({
      condition: e.detail.value,
      fei3: '',
      fei4: ''
    })
  },

  formSubmit: function(e) {
    var f = Number(e.detail.value.input)

    var g = 0 //诉讼费
    var h = 0 //减半
    if (f < 200000) {
      g = 300
    } else if (f >200000) {
      g = 0.005*f
    }
    h = 0.5*g
    this.setData({
      fei3: g.toFixed(2),
      fei4: h.toFixed(2)
    })
  },
  formReset: function() {
    this.setData({
      condition: false,
      fei3: 300,
      fei4: 150
    })
  } 
})