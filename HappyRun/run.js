let utils = require('./utils.js')
Page({
  data: {
    running: false,
    latitude: 0,
    longitude: 0,
    markers: [],
    meters: 0.00,
    second: 0
  },
  onLoad(options) {
    this.curLocation()
    let timer = setInterval(this.record, 1000)
  },
  record() {
    if (!this.data.running) {
      return
    }
    this.setData({
      second: this.data.second + 1
    })
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        // 增加标注点
        let newMarker = {
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: 'redPoint.png',
        }
        let pace = 0  // pace 步伐
        let tmarkers = this.data.markers   // markers 标记
        // marker数组为空就不计算距离
        if (this.data.markers.length > 0) {
          let lastmarker = this.data.markers[this.data.markers.length - 1]
          pace = utils.getDistance(lastmarker.latitude,lastmarker.longitude, newMarker.latitude,newMarker.longitude)
          // gps定位偏差的数据漂移清零，户外gps进度15米左右
          if (pace < 15) {
            pace = 0
          } else {
            // 新标注点加入临时数据中
            tmarkers.push(newMarker)
          }
        } else {
          // 新标注点加入临时数据中
          tmarkers.push(newMarker)
        }
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: tmarkers,
          meters: this.data.meters + pace
        })
      },
    })
  },
  run: function() {
    this.setData({
      running: !this.data.running
    })
  },
  clear: function() {
    this.setData({
      markers: [],
      meters: 0,
      second: 0,
      running: false
    })
  },
  curLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log('latitude:'+ res.latitude)
        console.log('longitude:'+ res.longitude)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  }
})