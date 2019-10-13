var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, t = getApp(),
    i = require("../../utils/auth.js"),
    o = (require("../../wxParse/wxParse.js"), require("../../utils/WxNotificationCenter.js"));

const app = getApp()
import http from '../util/request.js'; 
Page({
    data: {
        showLoading: !0,
        logged: !1
    },
    onLoad: function() {
      wx.getSystemInfo({
        success: function (res) {
          if (res.system.split('iOS').length > 0) {
            wx.setStorageSync('ios' , 0);
          }else{
            wx.setStorageSync('ios', 1);
          }
          wx.setStorageSync('ios', 0);
        },
      })

      http.get('config').then(data => {
        if (data.pian == "1") {
          wx.setNavigationBarTitle({
            title: '联系我们',
          })
          wx.redirectTo({
            url: '../user/company/index',
          });
          return false;
        }
        wx.setNavigationBarTitle({
          title: data.sname,
        });
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
      var uid = 0;
      if (wx.getStorageSync("user") && (wx.getStorageSync("user").uid == 0)){
        uid = 0;
      } else if (!wx.getStorageSync("user")){
        uid = 0;
      }else{
        uid = wx.getStorageSync("user").uid;
      }
      if (uid == 0){
        t.WxService.navigateTo("/pages/decrypt/index");
      }
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      http.get('user', { uid: wx.getStorageSync("user").id}).then(data => {
        if (data.percent == 100){
          this.goUser();
        }
      });
        /*
        this.itemData = t.HttpResource("/start.php"), this.userAuthorization(), o.addNotification("DecryptNotification", this.didNotification, this)
        */
    },
    didNotification: function() {
       // this.userAuthorization()
    },
    userAuthorization: function() {
        /*
        if (t.WxService.getStorageSync("loginSession")) if ("object" == e(t.WxService.getStorageSync("loginSession"))) t.WxService.removeStorageSync("loginSession"), i.authorization();
        else {
            if (t.WxService.getStorageSync("us")) return t.WxService.redirectTo("/pages/index/index");
            this.setData({
                showLoading: !1
            })
        } else t.WxService.navigateTo("/pages/decrypt/index")
        */
    },
    onShow: function() {
      http.get('config').then(data => {
        if (data.pian == "1") {
          wx.setNavigationBarTitle({
            title: '联系我们',
          })
          wx.redirectTo({
            url: '../user/company/index',
          });
          return false;
        }
        wx.setNavigationBarTitle({
          title: data.sname,
        });
      });
    },
    // 开启缘分按钮
    bindPage: function(e) {
      //(wx.getStorageSync("user").isauth == 0 || (wx.getStorageSync("user").isauth == 1)) ? this.goLogin() : this.goIndex()
      this.goLogin();
    },
    goIndex: function() {
        return t.WxService.redirectTo("/pages/index/index")
    },
    goUser: function () {
      return t.WxService.redirectTo("/pages/u/index")
    },
    goLogin: function() {
        return t.WxService.navigateTo("/pages/register/step/step1")
    }
});