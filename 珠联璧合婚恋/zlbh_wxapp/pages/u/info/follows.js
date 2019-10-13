function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a
    }
    return Array.from(t)
}
var e = getApp(),
    a = require("../../../utils/util.js");
require("../../../utils/WxNotificationCenter.js");
Page({
    data: {
        logged: 0,
        tabs: ["谁看过我", "我看过谁"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
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
        newArr: [1, 2, 3]
    },
    onLoad: function() {
        e.WxService.getStorageSync("us") ? this.setData({
            logged: 2
        }) : this.setData({
            logged: 1
        }), this.viewme = e.HttpResource("member/viewme.html"), this.$wuxToast = e.Wux().$wuxToast, this.initData(), this.getList()
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
        })
    },
    getList: function() {
        var s = this,
            i = this.data.collect,
            o = Object.assign([], this.data.collect.params);
        console.log(o), 0 == o.type ? this.viewme = e.HttpResource("member/viewme.html") : this.viewme = e.HttpResource("member/follow.html"), o.type = 0, this.data.hasMore && (this.setData({
            hasMore: !1
        }), o.page = i.params.page++, o.size = i.params.size, wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), this.viewme.getAsync(o).then(function(o) {
            if (wx.hideToast(), 200 == o.code) o.data.list.forEach(function(t, e) {
                t.is_collect = !1
            }), o.data.list.length && (o.data.list.forEach(function(t) {
                return t.gzlogtime = a.formatDate(t.gzlogtime)
            }), i.items = [].concat(t(i.items), t(o.data.list))), i.todayViewNum = o.data.todayViewNum, i.paginate = o.data.paginate, i.islock = o.data.islock, s.setData({
                hasMore: !0,
                collect: i,
                userinfo: o.data.userinfo,
                showLoading: !1
            });
            else if (300 == res.code) return e.WxService.showModal({
                content: "未知错误，请重新登录！",
                showCancel: !1
            }).then(function() {
                return e.WxService.removeStorageSync("loginSession")
            }, e.WxService.removeStorageSync("us"), e.WxService.navigateTo("/pages/buy/payment"))
        }))
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
    onUnload: function() {}
});