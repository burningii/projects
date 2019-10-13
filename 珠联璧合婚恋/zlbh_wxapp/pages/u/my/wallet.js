var t = getApp(),
    i = require("../../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../../util/request.js';
Page({
    data: {},
    onShow: function(a) {
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data, avatar: data.avatar });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
    },
    didNotification: function() {
        
    },
    getData: function() {
        var t = this;
       
    },
    getIospay: function() {
        if ("ios" == t.WxService.getStorageSync("systemInfo").platform && 1 == this.data.wallet.ios_pay) return t.WxService.showModal({
            content: "小程序暂不支持开通服务！",
            showCancel: !1
        });
        t.WxService.navigateTo("/pages/buy/payment")
    },
    onUnload: function() {
        i.postNotificationName("UserNotification")
    }
});