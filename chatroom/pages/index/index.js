Page({
  data: {
    scrollTop: 0,
    list: [],
    nickName: null,
    avatarUrl: null
  },
  onLoad: function() {
    wx.connectSocket({
      // 服务器地址
      url: 'wss://www.gdmec.vip:8081',
    })
    // 连接成功
    wx.onSocketOpen((result) => {
      console.log('连接成功')
    })
    wx.onSocketMessage((msg) => {
      console.log(msg)
      var data = JSON.parse(msg.data)
      console.log(data)
      if (data&&data.name == this.data.nickName) {
        return;
      }
      data.id = this.id++
      data.role = 'server'
      var list = this.data.list
      list.push(data)
      this.setData({
        list: list
      })
      this.rollingBottom()
    })
  },
  // 发送内容
  count: 0,
  message: '',
  send: function() {
    // 判断发送内容是否为空
    if (this.message) {
      wx.sendSocketMessage({
        data: this.message,
      })
      // 我自己的消息
      console.log(this.data.list)
      var list = this.data.list
      list.push({
        id: this.count++,
        msg: this.message,
        role: 'me'
      })
      this.setData({
        list: list
      })
      this.rollingBottom()
    } else {
      // 弹出提示框
      wx.showToast({
        title: '消息不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  bindChange(res) {
    this.message = res.detail.value
  },
  onUnload() {
    wx.onSocketClose();
    wx.showToast({
      title: '连接已断开',
      icon: 'none',
      duration: 2000
    })
  },
  // 聊天内容始终显示在最低端
  rollingBottom(e) {
    wx.createSelectorQuery().selectAll('.list').boundingClientRect(rects => {
      rects.forEach(rect => {
        this.setData({
          scrollTop: rect.bottom
        })
      })
    }).exec()
  },
  userinfo(e) {
    console.log(e)
    let {  nickName, avatarUrl } = e.detail.userInfo
    if (this.nickName == null ) {
      wx.sendSocketMessage({
        data: 'nickName|' + nickName + '|avatarUrl|' + avatarUrl,
      })
    }
    this.setData({
      nickName, avatarUrl
    },() => {
      console.log(this.data.nickName)
      console.log(this.data.avatarUrl)
    })
  }
})