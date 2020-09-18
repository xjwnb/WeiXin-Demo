//index.js
//获取应用实例


Page({
  // 为页面提供数据
  data: {
    msg: "Hello world",
    person: {
      name: "肖佳炜",
      age: 18
    },
    bg: "bgStyle",
    todos: [{
        name: "JavaScript",
        completed: false
      },
      {
        name: "Vue",
        completed: false
      },
      {
        name: "React",
        completed: false
      },
      {
        name: "HTML",
        completed: true
      }
    ],
    message: "肖佳炜"
  },
  handle(e) {
    console.log('xjwnb')
    console.dir(e)
  },
  faHandle() {
    console.log('fa')
  },
  soHandle() {
    console.log('so')
  },
  // 事件传参
  taphandle(e) {
    console.log(e.target.dataset)
  },
  inputHandle(e) {
    // this.setData 用来修改data中的数据
    this.setData({
      message: e.detail.value
    })
  }
})