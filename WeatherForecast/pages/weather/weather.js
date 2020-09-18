var defaultcity, getweather, gettemp, getwind, getpic, city, weather, temp, wind
var baseurl = "https://api.map.baidu.com/telematics/v3/weather?output=json&ak=tlK3XHV84kjvqlhKcagQNLhWL8HlBMcZ&location="
Page({
  data: {

  },
  // 默认载入
  onLoad: function(e) {
    defaultcity = '广州'
    wx.request({
      url: baseurl + defaultcity,
      success: (res) => {
        var data = res.data.results[0].weather_data[0]
        getweather = data.weather
        gettemp = data.temperature
        getwind = data.wind
        getpic = data.dayPictureUrl
        this.setData({
          city: defaultcity,
          weather: getweather,
          temp: gettemp,
          wind: getwind,
          pic: getpic
        })
      }
    })
  },
  // 获取输入
  bindKeyInput: function(e) {
    defaultcity = e.detail.value
  },
  // 搜索城市
  search: function(e) {
    wx.request({
      url: baseurl + defaultcity,
      success: (res) => {
        var data = res.data.results[0].weather_data[0]
        getweather = data.weather
        gettemp = data.temperature
        getwind = data.wind
        getpic = data.dayPictureUrl
        this.setData({
          city: defaultcity,
          weather: getweather,
          temp: gettemp,
          wind: getwind,
          pic: getpic
        })
      }
    })
  }
})