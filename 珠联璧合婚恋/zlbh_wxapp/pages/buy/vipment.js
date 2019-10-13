! function(t) {
    t && t.__esModule
}(require("../../etc/config"));
var t = getApp(),
    o = (require("../../wxParse/wxParse.js"), require("../../utils/WxNotificationCenter.js"));
const app = getApp()
import http from '../util/request.js';
Page({
    data: {
        logged: 0,
        indicatorDots: !0,
        indicatorColor: "hsla(0,0%,100%,.3)",
        indicatorActiveColor: "#ffffff",
        showModalStatus: [!1, !1],
        showMemberContact: !1,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        actionItem: "0,0"
    },
    showKefuEvent: function () {
      this.setData({
        showKefuStatus: !0
      })
    },
    hideKefuEvent: function () {
      this.setData({
        showKefuStatus: !1
      })
    },
    onLoad: function() {
        this.$wuxToast = t.Wux().$wuxToast;
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data, avatar: data.avatar });
        });
        http.get('config').then(data => {
          this.setData({ config: data });
        });
    },
    didNotification: function() {
        this.getData()
    },
    onShow: function() {},
    getData: function() {
        var t = this;
        this.productData.getAsync().then(function(o) {
            200 == o.code && t.setData({
                logged: 1,
                ios_pay: o.data.ios_pay,
                userinfo: o.data.userinfo
            })
        })
    },
    showToastSuc: function(t, o) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return o
            }
        })
    },
    showToastErr: function(t, o) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return o
            }
        })
    },
    getIospay: function() {
        if ("ios" == t.WxService.getStorageSync("systemInfo").platform && 1 == this.data.ios_pay) return t.WxService.showModal({
            content: "小程序暂不支持开通服务！",
            showCancel: !1
        });
        t.WxService.navigateTo("/pages/buy/payment")
    },
    onUnload: function() {
        o.postNotificationName("UserNotification", this)
    }
});