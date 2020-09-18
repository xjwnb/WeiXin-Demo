Page({
  onLoad: function(options) {
    wx.request({
      url: 'http://192.168.1.3:3000',
      success: res => {
        console.log('get服务器的返回一下信息：')
        console.log(res.data)
        this.setData(res.data)
      },
      fail: res => {
        console.log('get服务器连接失败')
      }
    })
  },
  // 表单提交按钮点击处理函数,向服务器发送数据
  submit: function(e) {
    wx.request({
      method: 'post',
      url: 'http://192.168.1.3:3000',
      data: e.detail.value,
      success: res => {
        console.log('post 服务器返回一下信息：')
        console.log(res)
      },
      fail: res => {
        console.log('post服务器连接失败')
      }
    })
  }
})