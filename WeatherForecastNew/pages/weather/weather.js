var defaultcity, weatherInfo, city
// 路径来源：心知天气
var baseUrl = "https://api.seniverse.com/v3/weather/daily.json?key=SDLxHre5WmVSnzBeb&language=zh-Hans&unit=c&start=0&days=4&location="
Page({
  data: {
    
  },
  // 初始化加载天气
  onLoad: function(e) {
    defaultcity = "广州"
    this.requestWeatherInfo()
  },
  // 获取输入
  bindKeyInput: function (e) {
    defaultcity = e.detail.value
  },
  // 查询城市信息
  search: function() {
    this.requestWeatherInfo()
  },
  // 请求数据
  requestWeatherInfo: function() {
    wx.request({
      url: baseUrl + defaultcity,
      success: res => {
        weatherInfo = res.data.results[0].daily[0]
        city = defaultcity
        this.setData({
          city,
          weatherInfo

        })
      }
    })

  }
})