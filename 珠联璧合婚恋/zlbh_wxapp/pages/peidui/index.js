var t = getApp();
var a = getApp();
const app = getApp()
import http from '../util/request.js'; 
Page({
    data: {
        logged: 0,
        showPeiduiInfo: !1,
        show:1,
        bg: a.globalData.bgurl,
        showModalStatus: [!1, !1, !1]
    },
    onLoad: function() {
      this.$wuxToast = t.Wux().$wuxToast;
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        var t = data.isauth;
        if (2 != t) return a.WxService.showModal({
          title: "提示",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "去认证",
          content: "为保证平台用户真实性以及遵守相关运营规范，请完善您的实名认证信息"
        }).then(function (t) {
          a.WxService.navigateTo("/pages/u/verify/step1")
        });
        if (data.thisday == 1){
          this.setData({show:0});
        }
        this.setData({ user: data });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
    },
    getUserInfoData: function() {
        
    },
    getPeidui: function() {
        if (0 != this.data.user.thisday) return t.WxService.showModal({
            content: "今天已经匹配过了，请明日再来！",
            showCancel: !1
        });
        if (0 == this.data.user.imkey) return t.WxService.showModal({
          content: "您的钥匙不足!",
          showCancel: !1
        });
        this.setData({ show:0});
        http.get('peidui' , {uid:wx.getStorageSync("user").id}).then(data => {
          this.setData({user:data});
        });
    },
    getIospay: function() {
        t.WxService.navigateTo("/pages/buy/imkeyment")
    },
    getShowMessage: function(e) {
        var o = this,
            a = this.data.user;
        return 0 != a.thisday ? t.WxService.showModal({
            content: "今天已经匹配过了，请明日再来！",
            showCancel: !1
        }) : 0 == a.imkey ? "ios" == t.WxService.getStorageSync("systemInfo").platform && 1 == this.data.ios_pay ? t.WxService.showModal({
            content: "小程序暂不支持此功能！",
            showCancel: !1
        }) : t.WxService.showModal({
            content: "剩余钥匙不足，充值购买次数！",
            showCancel: !1
        }).then(function() {
            return t.WxService.navigateTo("/pages/buy/payment")
        }) : void this.setData({ show: 0 });
        http.get('peidui', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data });
        });
    },
    maskHideFilter: function(t) {
        this.setData({show:0});
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
    }
});