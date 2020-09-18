module.exports = {
  // 加法
  add: function (arg1, arg2) {
    var r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },

  // 减法
  sub: function (arg1, arg2) {
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))

    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },

  // 乘法
  mul: function (arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {

    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {

    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },


  // 除法
  div: function (arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) { }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) { }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },

  // 乘方
  inv: function(arg1, arg2) {
    var m, n, r,
      s1 = arg1.toString(),
      s2 = arg2.toString(), r1, r2
    try {
      m = s1.split('.')[1].length
    } catch (e) {
      m = 0
    }
    try {
      n = s2.split('.')[1].length
    } catch (e) {
      n = 0
    }
    r1 = Number(s1.replace('.', ''))
    r2 = Number(s2.replace('.', ''))
    r = (m + n == 0) ? 1 : Math.pow(10, (m + n) * Number(s2.split('.')[0]))
    var result = Math.pow(r1, r2) / r
    return  result 
  },

  // 平方根
  sqrt: function(arg1) {
    var common = Math.sqrt(arg1)
    var t = common.toString().split('.')[1] === undefined ? 0 : common.toString().split('.')[1].split('').length
    var r = t <= 10 ? common : common.toFixed(10)
    console.log(r)
    return r
  },

  // sin
  sin: function(arg) {
    var t
    var common = Math.sin(arg)
    try  {
      t = common.toString().split('.')[1].length
    } catch (e) {
      t = 0
    }
    var r = t <= 10 ? common : common.toFixed(10)
    return r
  },

  // cos
  cos: function(arg) {
    var t
    var common = Math.cos(arg)
    try {
      t = common.toString().split('.')[1].length
    } catch (e) {
      t = 0
    }
    var r = t <= 10 ? common : common.toFixed(10)
    return r
  }
}

// result.toString().split('.')[1].length <= 10 ?
//  : result.toFixed(10)

// length <= 10 ?
// : result.toFixed(10)