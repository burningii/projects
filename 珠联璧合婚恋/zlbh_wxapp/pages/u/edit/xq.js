var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
}, a = getApp(),
  e = (require("../../../utils/WxNotificationCenter.js"), [{
    id: 1,
    name: "生活",
    l2: [{
      id: 1,
      name: "朋友聚会"
    }, {
      id: 2,
      name: "投资理财"
    }, {
      id: 3,
      name: "电子产品"
    }, {
      id: 4,
      name: "旅游"
    }, {
      id: 5,
      name: "网购"
    }, {
      id: 6,
      name: "养花"
    }, {
      id: 7,
      name: "宠物猫"
    }, {
      id: 8,
      name: "睡懒觉"
    }, {
      id: 9,
      name: "散步"
    }, {
      id: 10,
      name: "宠物狗"
    }, {
      id: 11,
      name: "汽车"
    }]
  }, {
    id: 2,
    name: "体育",
    l2: [{
      id: 1,
      name: "游泳"
    }, {
      id: 2,
      name: "跑步"
    }, {
      id: 3,
      name: "篮球"
    }, {
      id: 4,
      name: "滑雪"
    }, {
      id: 5,
      name: "瑜伽"
    }, {
      id: 6,
      name: "羽毛球"
    }, {
      id: 7,
      name: "野外露营"
    }, {
      id: 8,
      name: "台球"
    }, {
      id: 9,
      name: "器械健身"
    }, {
      id: 10,
      name: "足球"
    }, {
      id: 11,
      name: "爬山"
    }]
  }, {
    id: 3,
    name: "休闲",
    l2: [{
      id: 1,
      name: "网络游戏"
    }, {
      id: 2,
      name: "摄影"
    }, {
      id: 3,
      name: "钓鱼"
    }, {
      id: 4,
      name: "歌舞话剧"
    }, {
      id: 5,
      name: "阅读"
    }, {
      id: 6,
      name: "电影"
    }, {
      id: 7,
      name: "音乐"
    }, {
      id: 8,
      name: "酒吧/KTV"
    }, {
      id: 9,
      name: "书法/绘画"
    }, {
      id: 10,
      name: "自驾游"
    }]
  }, {
    id: 4,
    name: "饮食",
    l2: [{
      id: 1,
      name: "火锅"
    }, {
      id: 2,
      name: "海鲜"
    }, {
      id: 3,
      name: "茶/咖啡"
    }, {
      id: 4,
      name: "中餐"
    }, {
      id: 5,
      name: "西餐"
    }, {
      id: 6,
      name: "果蔬汁"
    }, {
      id: 7,
      name: "奶制饮品"
    }, {
      id: 8,
      name: "酒精饮料"
    }]
  }]);
import http from '../../util/request.js';
Page({
  data: {
    chooseTotalCount: 10,
    postData: []
  },
  onLoad: function (t) {

    http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
      if (data.xingtag) {
        this.setData({
          userEnjoy_id: data.xingtag.split(';')
        });
      }
      this.getData();
      this.setData({ userInfo: data });
    });
    this.$wuxToast = a.Wux().$wuxToast
  },
  getData: function () {
    var a = this,
      n = JSON.parse(decodeURIComponent(JSON.stringify(e))),
      i = {};
    0 == Object.keys(i).length && n.forEach(function (t, a) {
      if (i[t.id] = t, t.l2) {
        var e = {};
        t.l2.forEach(function (t, a) {
          e[t.id] = t, t.checked = !1
        }), i[t.id].l2 = e
      }
    }), this.data.userEnjoy_id && this.data.userEnjoy_id.forEach(function (e, n) {
      var o = e.split(",");
      2 == o.length && "object" == t(i[o[0]].l2[o[1]]) && (i[o[0]].l2[o[1]].checked = !0), a.data.postData.push({
        id: i[o[0]].id + "," + i[o[0]].l2[o[1]].id,
        name: i[o[0]].l2[o[1]].name
      })
    }), this.setData({
      enjoy: i,
      postData: this.data.postData
    })
  },
  changeTab: function (t) {
    var a = this,
      e = this.data.enjoy,
      n = t.currentTarget.dataset.name,
      i = t.currentTarget.dataset.fid,
      o = t.currentTarget.dataset.checked,
      s = i.split(",");
    this.data.postData = this.data.postData.filter(function (t) {
      return !(t.id == i)
    }), 0 == o ? a.data.postData.length >= a.data.chooseTotalCount ? a.showToastText("最多可选择 " + a.data.chooseTotalCount + " 项") : (e[s[0]].l2[s[1]].checked = !0, this.data.postData.push({
      id: i,
      name: n
    })) : e[s[0]].l2[s[1]].checked = !1, this.setData({
      enjoy: e,
      postData: this.data.postData
    })
  },
  showToastSuc: function (t, a) {
    this.$wuxToast.show({
      type: "success",
      timer: 1500,
      color: "#fff",
      text: "" + t,
      success: function () {
        return a
      }
    })
  },
  showToastSuc: function (t) {
    wx.showToast({
      title: t,
      duration: 1500,
      icon: 'sucess'
    });
  },
  showToastErr: function (t) {
    wx.showToast({
      title: t,
      duration: 1500,
      icon: "none"
    });
  },
  showToastText:function(t){
    wx.showToast({
      title: t,
      duration: 1500,
      icon: "none"
    });
  },
  getEnjoyData: function (t) {
    //e.formId = t.detail.formId;
    var e = this,
      n = {};
    n.fid = this.data.postData.map(function (t) {
      return t.id
    }).join(";"), n.name = this.data.postData.map(function (t) {
      return t.name
    }).join(",");
    http.post('saveuser3', { id: wx.getStorageSync("user").id, xingtag: n.fid, xingname: n.name, formId: t.detail.formId }).then(data => {
      e.showToastSuc("保存成功");
      setTimeout(function () {
        wx.navigateTo({
          url: 'index',
        })
      }, 2500);
    });
  },
  onUnload: function () { }
});