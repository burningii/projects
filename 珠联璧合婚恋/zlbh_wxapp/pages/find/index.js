function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a
    }
    return Array.from(t)
} 
var e = getApp(),
    a = require("../../utils/util.js"),
    i = require("../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../util/request.js'; 
Page({
    data: {
        logged: 0,
        tabs: ["谁看过我", "我看过谁"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        msgStatus: !1,
        collect: {},
        hasMore: !0,
        is_collect: !1,
        showLoading: !0,
        showModalStatus: [!1],
        userCheck: {
            basic_check: 1,
            is_introduce: 1,
            more_check: 1,
            want_check: 1
        },
        bg: e.globalData.bgurl,
        pairData: [],
        is_record: !1,
        curpage:"find",
        backTopValue: false,
        nodata: false,
        list: [],
        allPages: 0,
        page: 1,
        loadMoreData: "下拉加载更多",
        type:0,
        ios: wx.getStorageSync("ios")
    },
    onLoad: function() {
      this.$wuxToast = e.Wux().$wuxToast;
      http.get('user',{uid:wx.getStorageSync("user").id}).then(data => {
        this.setData({user:data});
      });
      if (!wx.getStorageSync('lat')) {
        wx.getLocation({
          type: "wgs84",
          success: function (res) {
            wx.setStorageSync('lat', res.latitude);
            wx.setStorageSync('lng', res.longitude);
          },
        })
      }
      http.get('config').then(data => {
        this.setData({config:data});
      });
      http.get('user5').then(data => {
        this.setData({ user5: data });
      });
    
      this.initData();
    },
    onShow: function() {
        var t = this;
       
    },
    userinfoNotification: function(t) {
        var a = this;
        t.id && (this.data.collect.items.forEach(function(e, a) {
            e.id == t.id && (e.is_imkey = !0)
        }), this.setData({
            collect: this.data.collect
        })), e.HttpResource("member/getuserinfo.html").getAsync().then(function(t) {
            200 == t.code && a.setData({
                userinfo: t.data.userinfo
            })
        })
    },
    initData: function() {
        this.setData({
            collect: {
                items: [],
                params: {
                    page: 1,
                    limit: 10,
                    type: this.data.type || 0
                },
                paginate: {
                    hasNext: !0
                }
            }
        });
        var o = this;
        http.get('find', {page: this.data.page, limit: 10,type: this.data.type || 0}).then(data => {
          console.log(data);
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
        }), this.getList()
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
    getLogUrl: function(t) {
        e.HttpService.wechatSetFormid({
            siteid: wx.getStorageSync("siteid"),
            formId: t.detail.formId
        }), wx.reLaunch({
            url: t.target.dataset.url
        })
    },
    gethyurl: function(t) {
        var a = t.currentTarget.dataset.id;
        if (1 != !this.data.collect.islock) return e.WxService.showModal({
            title: "提示",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "成为会员",
            content: "开通会员查看访问您的人"
        }).then(function(t) {
            return 1 == t.confirm && e.WxService.navigateTo("/pages/buy/payment")
        });
        e.WxService.navigateTo("/pages/index/member", {
            id: a
        })
    },
    catchTouchMove: function() {
        return !1
    },
    onUnload: function() {
        i.removeNotification("userinfoNotification", this)
    }
});