//app.js
// 定义token的常量
const TOKEN = 'token'


App({
  onLaunch: function() {

    // 获取缓存中的token
    const token = wx.getStorageSync(TOKEN)

    // 判断token是否存在
    if (token && token.length !== 0) {
      // 已经获得token，则验证token是否过期
      this.check_token(token)

    } else {
      // 没有token 就执行登录操作以获得token
      this.login()
    }


  },
  globalData: {
    token: ''
  },

  // 登录封装的函数
  login() {
    // 登录
    wx.login({

      success: res => {
        // 获得code值
        const code = res.code

        // 将code值发送给服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: res => {
            console.log(res)
            // 获得token并保存到globalData
            const token = res.data.token
            this.globalData.token = token

            // 获得的token保存到本地缓存
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  },

  // 验证token 是否过期
  check_token(token) {
    // 发送请求验证
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      // 验证成功
      success: res => {
        if (!res.data.errCode) {
          // token有效则将token保存到globalData中
          this.globalData.token = token
        } else {
          // 无效则重新登录
          this.login()
        }
      },
      // 验证失败
      fail: err => {
        console.log(err)
      }
    })
  }
})