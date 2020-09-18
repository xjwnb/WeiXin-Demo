let utils = require('./utils.js')
let keepData = {}
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
      this.data.markers.length > 1 ? this.data.markers[this.data.markers.length - 1].iconPath = "endPoint.png" : ""
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
        let pace = 0 // pace 步伐
        let tmarkers = this.data.markers // markers 标记
        // marker数组为空就不计算距离
        if (this.data.markers.length > 0) {
          this.data.markers[0].iconPath = "startPoint.png"
          let lastmarker = this.data.markers[this.data.markers.length - 1]
          pace = utils.getDistance(lastmarker.latitude, lastmarker.longitude, newMarker.latitude, newMarker.longitude)
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
        console.log('latitude:' + res.latitude)
        console.log('longitude:' + res.longitude)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
  // 保存
  keep() {
    // console.log(this.data)
    let _data = this.data
    keepData.latitude = _data.latitude
    keepData.longitude = _data.longitude
    keepData.markers = _data.markers
    keepData.meters = _data.meters
    keepData.running = _data.running
    keepData.second = _data.second
    console.log(keepData)
  },
  // 回放  
  back: function() {
    console.log(keepData)
    let last = keepData.markers[keepData.markers.length - 1]
    let marker = []
    let index = 0
    let time = setInterval(() => {
      if (index !== keepData.markers.length - 1) {

        marker.push(keepData.markers[index])
        console.log(keepData.markers[index])
        console.log(index, marker, marker.length)
        this.setData({
          markers: marker,
          polyline: [{
            points: marker,
            color: "#00ff00",
            width:5,
          }]
        })
        index++
      } else {
        marker.push(last)
        console.log(marker)
        this.setData({
          markers: marker,
          polyline: [{
            points: marker,
            color: "#00ff00",
            width: 5,
          }]
        })
        clearInterval(time)
      }
    }, 1000)
    console.log(marker, last)
  }
})