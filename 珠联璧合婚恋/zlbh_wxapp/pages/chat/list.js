/* 1551726713@qq.com  仅供学习交流，切勿用于商业用途，否则后果自负   time:2018-10-30 19:53:35*/
var t = getApp();
Page({
    data: {
        list: [],
        isFresh: !1
    },
    onLoad: function(t) {
        this.getChatList()
    },
    getChatList: function(n) {
        var o = this;
        t.util.request({
            url: "entry/wxapp/getChatList",
            success: function(t) {
                "function" == typeof n && n(), o.setData({
                    list: t.data.data
                }), o.toPageTop()
            }
        })
    },
    toPageTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
    },
    onReady: function() {},
    onShow: function() {
        var n = this;
        t.config.init(function() {
            t.config.set(n)
        }), !0 === n.data.isFresh && this.getChatList()
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getChatList(function() {
            wx.stopPullDownRefresh()
        })
    }
});