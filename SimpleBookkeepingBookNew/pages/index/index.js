var arrayincp = [] // 收入
var arraycp = [] // 支出
var arrayinEvent = [] // 收入事件
var arrayEvent = [] // 支出事件
var indate = '' // 收入日期
var date = '' // 支出日期
var arrayinTime = [] // 收入时间数组
var arrayTime = [] // 支出时间数组
var income // 收入总额
Page({
  data: {
    array: arrayincp,
    array1: arraycp,
    condition1: true,
    condition2: false,
    input: false,
    nav1: "nav1",
    nav2: "nav2",
    income: 0,
    pay: 0,
    balance: 0,
    event1: arrayinEvent,
    event2: arrayEvent,
    intime: arrayinTime,
    time: arrayTime,
    date: ''
  },
  // 页面加载，提取保存数据
  onLoad: function(options) {
    wx.getStorage({
      key: 'array',
      success: res => {
        var arraystore = res.data
        arrayincp = arraystore[0]
        arraycp = arraystore[1]
        arrayinEvent = arraystore[2]
        arrayEvent = arraystore[3]
        arrayinTime = arraystore[4]
        arrayTime = arraystore[5]
        // 任务一: 开始
        this.setData({
          array: arrayincp,
          array1: arraycp,
          event1: arrayinEvent,
          event2: arrayEvent,
          intime: arrayinTime,
          time: arrayTime,
          income: arrayincp.length > 0 ? arrayincp.reduce((x, y) => {
            return parseFloat(x) + parseFloat(y)
          }) : 0,
          pay: arraycp.length > 0 ? arraycp.reduce((x, y) => {
            return parseFloat(x) + parseFloat(y)
          }) : 0
        })
        // 任务一结束
      },
    })
  },

  // 点击收入
  click1: function(e) {
    this.setData({
      condition1: true,
      condition2: false,
      nav1: "nav1",
      nav2: "nav2",
      input: false
    })
  },
  // 点击支出
  click2: function(e) {
    this.setData({
      condition1: false,
      condition2: true,
      nav1: "nav2",
      nav2: "nav1",
      input: false
    })
  },
  // 增加
  click: function(e) {
    this.setData({
      input: true
    })
  },
  // 页面隐藏时，储存数据
  onHide: function() {
    this.setStore()
  },

  // 设置本地存储
  setStore: function() {
    var arraystore = [arrayincp, arraycp, arrayinEvent, arrayEvent, arrayinTime, arrayTime]
    wx.setStorage({
      key: 'array',
      data: arraystore,
    })
  },

  // picker事件  mode = date 
  bindDateChange: function(e) {
    console.log('hhh')
    let _date = e.detail.value
    if (this.data.condition1) {
      indate = _date
    } else {
      date = _date
    }
    this.setData({
      date: _date
    })
  },


  // 表单提交数据
  submitData: function(e) {
    let intimes = indate
    let times = date
    if (e.detail.value.event.trim() && e.detail.value.money.trim()) {
      if (this.data.condition1) {
        arrayincp.push(e.detail.value.money)
        arrayinEvent.push(e.detail.value.event)
        arrayinTime.push(intimes)
      } else {
        arraycp.push(e.detail.value.money)
        arrayEvent.push(e.detail.value.event)
        arrayTime.push(times)
      }
      console.log(arraycp)
      this.setData({
        array: arrayincp,
        array1: arraycp,
        input: false,
        event1: arrayinEvent,
        event2: arrayEvent,
        intime: arrayinTime,
        time: arrayTime,
        income: arrayincp.length > 0 ? arrayincp.reduce((x, y) => {
          return parseFloat(x) + parseFloat(y)
        }) : 0,
        pay: arraycp.length > 0 ? arraycp.reduce((x, y) => {
          return parseFloat(x) + parseFloat(y)
        }) : 0
      })
      this.setStore()
    }
  }
})