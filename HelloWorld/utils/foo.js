function say(msg) {
  console.log('Hello  '+ msg)
}

// 导出say方法

module.exports = {
  say: say
}