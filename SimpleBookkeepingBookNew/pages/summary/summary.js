const arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let intotal = {}
let inmon = []
let inval = []
let mon = []
let total = {}
Page({
  data: {
    intotal: intotal,
    total: total,
    ii: false
  },

  onLoad: function(options) {
    this.getStore()
  },
  onShow: function() {
    this.getStore()
  },
  onHide: function (options) {
    
  },
  test: async function(date, mon) {
    for (let i = 0; i < arr.length; i++) {
      let ind = [];
      let mo = await date.filter((item, index) => {
        if (item == arr[i]) {
          ind.push(index);
          return true;
        }
        return false;
      });

      if (ind.length) {
        let newV = await ind.map((item) => {
          return mon[item];
        });

        let to = await newV.reduce((x, y) => {
          return Number(x) + Number(y);
        }, 0);
        let ak = mo[0]
        intotal[ak] = to
        this.setData({
          intotal: intotal
        })
      }
    }
  },

  test2: async function(date2, mon2) {
    for (let i = 0; i < arr.length; i++) {
      let ind = [];
      let mo = await date2.filter((item, index) => {
        if (item == arr[i]) {
          ind.push(index);
          return true;
        }
        return false;
      });

      if (ind.length) {
        let newV = await ind.map((item) => {
          return mon2[item];
        });

        let to = await newV.reduce((x, y) => {
          return Number(x) + Number(y);
        }, 0);
        let ak = mo[0]
        total[ak] = to
        this.setData({
          total: total
        })
      }
    }
  },

  getStore: function() {
    wx.getStorage({
      key: 'array',
      success: res => {
        let indate = res.data[4].map(item => {
          return item.split('-')[1]
        })
        let date = res.data[5].map(item => {
          return item.split('-')[1]
        })
        inmon = res.data[0]
        mon = res.data[1]
        this.test(indate, inmon)
        this.test2(date, mon)
      },
    })
  }
})