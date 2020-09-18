const ctx = wx.createCanvasContext('myCanvas')
var imagepath
var fun = true
let windowWid = 0
let windowHeig = 0
let flow = false
Page({
  data: {
    isImage: false,
    windowWidth: 0,
    windowHeight: 0,
    url: ''
  },
  // 获取分享图片地址
  onLoad: function(options) {
    console.log(options)
    wx.getSystemInfo({
      success: res => {
        let width = res.windowWidth
        let height = res.windowHeight
        this.setData({
          windowWidth: width * 0.7,
          windowHeight: height * 0.7
        }, () => {
          windowWid = this.data.windowWidth
          windowHeig = this.data.windowHeight
        })
      },
    })

    if (options.path !== undefined) {
      this.setData({
        url: JSON.stringify(options)[0] + JSON.stringify(options)[1]
      })
      imagepath = options.path                                          
      ctx.drawImage(imagepath, 0, 0, 240, 380)
      ctx.draw()
      wx.downloadFile({
        url: options.path,
        success: res => {
          this.setData({
            url: JSON.stringify(options.path)
          })
          imagepath = res.tempFilePath
          ctx.drawImage(imagepath, 0, 0, 240, 380)
          ctx.draw()
        },complete: re => {
          
        }
      })
    }

  },

  // 选择图片
  click: function(e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          isImage: true,
        })
        ctx.drawImage(res.tempFilePaths[0], 0, 0, windowWid, windowHeig)
        ctx.draw(true)
      },
    })
  },
  // 手指移动
  move: function(e) {
    let x = e.touches[0].x
    let y = e.touches[0].y
    // 打马赛克
    if (fun) {
      ctx.setFillStyle('red')
      ctx.fillRect(x, y, 10, 10)
      ctx.fillRect(x + 10, y + 10, 10, 10)
      ctx.setFillStyle('pink')
      ctx.fillRect(x + 10, y, 10, 10)
      ctx.fillRect(x, y + 10, 10, 10)
      ctx.draw(true)
      return
    } else if (flow) {
      ctx.setStrokeStyle('green')
      ctx.moveTo(x, y)
      ctx.lineTo(x + 30, y + 20)
      ctx.lineTo(x + 10, y + 30)
      ctx.closePath()
      ctx.stroke()
      ctx.draw(true)
      return
    } else {
      // 擦除
      ctx.clearRect(e.touches[0].x, e.touches[0].y, 20, 20)
      ctx.draw(true)
    }
    console.log(fun, flow)
  },
  // 按键切换
  clear: function(e) {
    fun = false
    flow = false
  },
  cover: function(e) {
    fun = true
    flow = false
    console.log(fun, flow)
  },
  end: function() {},

  // 保存图片
  save: function(e) {
    console.log('保存成功')
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success(res) {
        imagepath = res.tempFilePath
      }
    })
  },
  // 分享给好友
  onShareAppMessage: function() {
    return {
      title: '小卡车的图片',
      desc: '',
      path: '/pages/index/index?path=' + imagepath
    }
  },

  // 盖章
  seal: function(e) {
    if (this.data.isImage) {
      ctx.setFillStyle('red')
      ctx.setFontSize(30)
      ctx.fillText('07180742 肖佳炜', Math.random() * 35, Math.random() * Math.floor(windowHeig))
      ctx.draw(true)
    }
  },

  // 花式
  flower: function() {
    fun = false
    flow = true
  },
  // 上传 被手机小程序缓存害苦了
  upload: function() {
    wx.uploadFile({
      url: 'https://www.gdmec.vip/upload',
      filePath: imagepath,
      name: 'file',
      success: res => {
        imagepath = JSON.parse(res.data).url
      }
    })
  }
})