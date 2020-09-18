Page({
  // 初始化 data
  data: {
    src: '../../images/c.png',
    btnCss: {
      c: 'active',
      d: 'inactive',
      e: 'inactive',
      f: 'inactive',
      g: 'inactive',
      a: 'inactive',
      b: 'inactive'
    }
  },

  // 按钮点击事件
  change: function(e) {

    // 获取按钮 id
    var btnID = e.currentTarget.id

    // 设置对应 id 的图片路径
    var srcfile = '../../images/' + btnID + '.png'

    // 将 data 中的 btnCss 赋值给变量 cssobj
    var cssobj = this.data.btnCss

    // for in 遍历 btnCss 对象中的 key
    for (var i in cssobj) {

      // 1) if 语句判断 id
/*    if (i === btnID) {
        cssobj[i] = 'active'
        continue
      }
      cssobj[i] = 'inactive' */

      // 2） 三元
      i === btnID ? cssobj[i] = 'active' : cssobj[i] = 'inactive'
    }

    this.setData({
      src: srcfile,
      btnCss: cssobj
    })
  }
})