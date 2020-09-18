//index.js


Page({
  data: {

  },
  handle(){
    wx.showActionSheet({
      itemList: ['唱歌','打代码','打游戏'],
      itemColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tsHandle() {
    wx.showModal({
      title: '提示',
      content: '提示',
    })
  },
  showToastHandle() {
    wx.showToast({
      title: '成功',
      duration: 2000
    })
  }
})
