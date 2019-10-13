function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a
    }
    return Array.from(t)
}
var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}(require("../../etc/config")),
    a = getApp();
const app = getApp()
import http from '../util/request.js'; 
Page({
    data: {
        activeIndex: 0,
        msgStatus: !1,
        hasMore: !0,
        act: {},
        userCheck: {
            basic_check: 1,
            is_introduce: 1,
            more_check: 1,
            want_check: 1
        },
        showLoading: !0,
        curpage:'act',
        type:0
    },
    onLoad: function(t) {
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      this.initData()
    },
    onShow: function() {
        this.getList()
    },
    getLogin: function(t) {
        var e = t.currentTarget.dataset.id;
        a.WxService.getStorageSync("user") ? a.WxService.navigateTo("/pages/activity/show?id=" + e) : (a.WxService.showLoading({
            title: "您还未登录"
        }), setTimeout(function() {
            a.WxService.hideLoading(), a.WxService.navigateTo("/pages/register/step/step1")
        }, 1e3))
    },
    initData: function() {
      http.get('activity', {"type":this.data.type}).then(data => {
        this.setData({list:data});
      });
      
    },
    onTabClick: function(t) {
        var e = t.currentTarget.dataset.id,
            a = {
                list: [],
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
            activeIndex: e,
            act: a,
            showLoading: !0
        }), this.initData()
    },
    getList: function() {
       
    },
    onShareAppMessage: function() {
        return {
          title: (this.data.config.sharedesc) + " 相亲交友活动",
            path: "/pages/activity/list"
        }
    },
    onPullDownRefresh: function() {
        console.info("onPullDownRefresh"), this.getList()
    },
    onReachBottom: function() {
        this.data.act.paginate.hasNext && this.getList()
    },
    getLogUrl: function(t) {
        a.HttpService.wechatSetFormid({
            siteid: wx.getStorageSync("siteid"),
            formId: t.detail.formId
        }), wx.reLaunch({
            url: t.target.dataset.url
        })
    },
    showKefuEvent: function() {
        this.setData({
            showKefuStatus: !0
        })
    },
    hideKefuEvent: function() {
        this.setData({
            showKefuStatus: !1
        })
    },
    shower: function () {
      var current = this.data.config.url + this.data.config.gzh;
      wx.previewImage({
        current: current,
        urls: [current]
      })
    }
});