let musicList = require('./musicList.js')
let recommandList = require('./recommandList.js')

Page({
  // 页面切换
  changeItem: function(e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  // tab 切换
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },
  data: {
    item: 0,
    tab: 0,
    state: 'paused',
    playIndex: 0,
    playlist: [...musicList.musicList, ...recommandList.recommandList],
    play: {
      currentTime: 0,
      duration: 0,
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: ''
    },
    banners: [
      '/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg'
    ],
    recommandList: recommandList.recommandList,
    anima: []
  },
  // 实现播放器播放功能
  audioCtx: null,
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    console.log(this.audioCtx)
    // 默认选择第一首
    this.selectMusic(0)
    var that = this
    // 播放进度检测
    this.audioCtx.onError(function() {
      console.log('播放失败:' + this.audioCtx.src)
    })
    // 播放完成自动下一首
    this.audioCtx.onEnded(function() {
      that.next()
    })
    this.audioCtx.onTimeUpdate(function() {
      that.setData({
        'play.duration': that.audioCtx.duration,
        'play.currentTime': that.audioCtx.currentTime,
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
  },
  // 切换音乐
  selectMusic: function(index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    console.log(this.audioCtx.duration)
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': 0,
      'play.duration': 0,
      'play.percent': 0
    })


  },
  //播放按钮
  play: function() {

    this.audioCtx.play()
    this.setData({
      state: 'running'
    })

    let currentTime = this.data.play.currentTime
      this.setData({
        'play.currentTime': currentTime,
        anima: ['anima']
      }, () => {
        console.log(this.data.play.currentTime)
      })

  },
  // 暂停按钮
  pause: function() {
    this.audioCtx.pause()
    this.setData({
      state: 'paused',
      anima: ['anima', 'stop']
    })

  },
  // 下一曲按钮
  next: function() {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.selectMusic(index)
    if (this.data.state === 'running') {
      this.play()
    }
  },
  // 播放列表换曲功能
  change: function(e) {
    this.selectMusic(e.currentTarget.dataset.index)
    this.play()
  },
  // 拖动 slider 事件
  changeTime(e) {
    // clearInterval(time)
    console.log(e)
    this.setData({
      'play.currentTime': 0
    })
    console.log((this.audioCtx.duration * (e.detail.value / 100)).toFixed(3))
    
    this.setData({
      'play.currentTime': this.audioCtx.duration * (e.detail.value / 100),
    })
    this.audioCtx.seek(this.audioCtx.duration * (e.detail.value / 100))
  },
  // 点击推荐歌曲
  handleMusic(e) {
    var music = this.data.playlist[e.currentTarget.dataset.id - 1]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: e.currentTarget.dataset.id - 1,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': 0,
      'play.duration': 0,
      'play.percent': 0
    })
  }
})