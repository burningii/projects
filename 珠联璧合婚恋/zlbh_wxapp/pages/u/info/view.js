function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a
    }
    return Array.from(t)
}
var e = getApp(),
    a = require("../../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../../util/request.js';
Page({
    data: {
        tabs: ["谁看过我", "我看过谁"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        collect: {},
        hasMore: !0,
        is_collect: !1, 
        showLoading: !0,
        showModalStatus: [!1], 
        backTopValue: false,
        nodata: false,
        list: [],
        allPages: 0,
        page: 1,
        bg: e.globalData.bgurl,
        loadMoreData: "下拉加载更多",
    },
    onLoad: function() {
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data, avatar: data.avatar });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      this.$wuxActionSheet = e.Wux().$wuxActionSheet;
      this.initData();
    },
    userinfoNotification: function(t) {
        var a = this;
        t.id && (this.data.collect.items.forEach(function(e, a) {
            e.id == t.id && (e.is_imkey = !0)
        }), this.setData({
            collect: this.data.collect
        })), e.HttpResource("Member/getuserinfo.html").getAsync().then(function(t) {
            200 == t.code && a.setData({
                userinfo: t.data.userinfo
            })
        })
    },
    initData: function() {
        var o = this;
 
        var d= {};
        d.page = o.data.page;
        d.activeIndex = o.data.activeIndex;
        d.uid = wx.getStorageSync("user").id;
        http.get('getviewlist', d).then(data => {
          if (data.list.length == 0) {
            o.setData({ nodata: true });
          }
          if (o.data.page == 1) {
            var tempArray = [];
          } else {
            var tempArray = that.data.list;
          }
          var list = o.data.page == 1 ? data.list : tempArray.concat(data.list);
          list = list.length > 0 ? list : null;
          o.setData({ list: list, allPages: data.totalPage });
          if (data.list == null) {
            o.setData({ hasMore: 0 });
          }
        });
    },
    getList: function() {
        var e = this,
            a = this.data.collect,
            i = Object.assign([], this.data.collect.params);
        this.data.hasMore && (this.setData({
            hasMore: !1
        }), i.page = a.params.page++, i.size = a.params.size, this.viewme.getAsync(i).then(function(i) {
            200 == i.code && (i.data.list.forEach(function(t, e) {
                t.is_collect = !1
            }), i.data.list.length && (a.items = [].concat(t(a.items), t(i.data.list))), a.todayViewNum = i.data.todayViewNum, a.paginate = i.data.paginate, a.islock = i.data.islock, e.setData({
                hasMore: !0,
                collect: a,
                ios_pay: i.data.ios_pay,
                userinfo: i.data.userinfo,
                showLoading: !1
            }), console.log(a))
        }))
    },
    getMsg: function(t) {
        var a = t.currentTarget.dataset.id,
            i = t.currentTarget.dataset.index;
        0 == this.data.collect.items[i].is_imkey ? (this.data.showModalStatus[0] = !0, this.setData({
            activeChatIndex: i,
            showModalStatus: this.data.showModalStatus
        })) : e.WxService.navigateTo("/pages/im/imver", {
            id: a
        })
    },
    getMessage: function(t) {
        var a = this.data.collect,
            i = this.data.userinfo;
        if (e.WxService.getStorageSync("us")) {
            if (0 == a.items[this.data.activeChatIndex].is_imkey && 0 == i.imkey) return e.WxService.showModal({
                content: "剩余沟通次数不足，充值购买次数！",
                showCancel: !1
            }).then(function() {
                return e.WxService.navigateTo("/pages/buy/imkeyment")
            });
            this.data.showModalStatus[0] = !1, this.setData({
                showModalStatus: this.data.showModalStatus
            }), e.WxService.navigateTo("/pages/im/imver", {
                id: a.items[this.data.activeChatIndex].id
            })
        } else this.getLogin()
    },
    onTabClick: function(t) {
        var e = t.currentTarget.dataset.id,
            a = {
                items: [],
                params: {
                    page: 1,
                    limit: 10,
                    type: e
                },
                paginate: {
                    hasNext: !0
                }
            };
        this.setData({
            type: e,
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: e,
            collect: a,
            showLoading: !0
        }), this.initData()
    },
    onCollect: function(t) {
        var a = this,
            i = t.currentTarget.dataset.index,
            s = t.currentTarget.dataset.id;
        if (e.WxService.getStorageSync("us")) {
            if (this.data.us.memberID == s) return e.WxService.showModal({
                content: "自己无法跟自己打招呼",
                showCancel: !1
            });
            if (1 == this.data.collect.items[i].is_collect) return;
            var o = this.data.is_collect ? 0 : 1,
                c = this;
            this.data.collect.items[i].is_collect = !0, this.dzh.queryAsync({
                memberid: s,
                status: o
            }).then(function(t) {
                200 == t.code ? (c.showToastSuc(t.data), c.setData({
                    "collect.items": a.data.collect.items
                })) : c.showToastSuc(t.data)
            })
        } else this.getLogin()
    },
    maskHideFilter: function(t) {
        var e = t.currentTarget.dataset.status;
        this.data.showModalStatus[e] = !1, this.setData({
            showModalStatus: this.data.showModalStatus,
            animateCss: "weui-animate-fade-out"
        })
    },
    onReachBottom: function() {
        1 == this.data.collect.islock && 0 == this.data.activeIndex || this.data.collect.paginate.hasNext && this.getList()
    },
    showToastSuc: function(t, e) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return e
            }
        })
    },
    showToastErr: function(t) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    showToastCancel: function(t) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    getIospay: function() {
        if ("ios" == e.WxService.getStorageSync("systemInfo").platform && 1 == this.data.ios_pay) return e.WxService.showModal({
            content: "小程序暂不支持开通服务！",
            showCancel: !1
        });
        e.WxService.navigateTo("/pages/buy/payment")
    },
    onUnload: function() {
        a.removeNotification("userinfoNotification", this)
    },
    onPullDownRefresh() {
      var self = this;
      setTimeout(function () {
        if (self.data.page < self.data.allPages) {
          self.setData({
            page: self.data.page + 1
          });
          self.initData();
        } else {
          self.setData({ loadMoreData: "没有数据了" });
        }
      }, 300);
    },
    onReachBottom() {
      var self = this;
      setTimeout(function () {
        if (self.data.page < self.data.allPages) {
          self.setData({
            page: self.data.page + 1
          });
          self.initData();
        } else {
          self.setData({ loadMoreData: "没有数据了" });
        }
      }, 300);
    }
});