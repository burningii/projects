! function(n) {
    n && n.__esModule
}(require("../../etc/config"));
var n = getApp();
Page({
    data: {
        logged: 0
    },
    onLoad: function(t) {
        t.url && (this.url = decodeURIComponent(t.url)), this.hnqx = n.HttpResource("/hnqx.html"), this.getinfo(), wx.removeStorageSync("clipboardCache", 1)
    },
    onShow: function() {
        1 == wx.getStorageSync("clipboardCache") && n.WxService.showModal({
            content: "是否完成支付！",
            cancelText: "取消",
            confirmText: "已完成"
        }).then(function(n) {
            return 1 == n.confirm && wx.reLaunch({
                url: "/pages/u/index"
            })
        })
    },
    getinfo: function() {
        var n = this;
        this.hnqx.getAsync().then(function(t) {
            (t.code = 200) && n.setData({
                info: t.data
            })
        })
    },
    copylink: function(t) {
        var o = this;
        this.url ? wx.setClipboardData({
            data: this.url,
            success: function(t) {
                n.WxService.showModal({
                    content: "复制成功，打开浏览器粘贴支付链接",
                    showCancel: !1
                })
            },
            fail: function() {
                o.copyErr()
            }
        }) : o.copyErr()
    },
    copyWechat: function() {
        var t = this.data.info.wechatNum,
            o = this;
        t ? wx.setClipboardData({
            data: t,
            success: function(t) {
                n.WxService.showModal({
                    content: "复制红娘微信号成功",
                    showCancel: !1
                })
            },
            fail: function() {
                o.copyErr()
            }
        }) : o.copyErr()
    },
    copyErr: function() {
        var t = this;
        n.WxService.showModal({
            content: "复制失败，请稍后重试或联系红娘客服",
            showCancel: !1
        }).then(function(n) {
            return 1 == n.confirm && t.getinfo()
        })
    },
    onHide: function() {
        wx.setStorageSync("clipboardCache", 1)
    }
});