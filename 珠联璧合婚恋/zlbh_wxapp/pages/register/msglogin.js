var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}(require("../../helpers/WxValidate")),
    t = getApp();
import http from '../util/request.js';     
Page({
    data: {
        mobile: {
            number: "",
            phone_verify_status: !1,
            phone_verify_expiry_time: 60,
            phone_verify_text: "获取验证码"
        }
    },
    onLoad: function(i) {
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
      });
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
      });
    },
    navigateTo: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        })
    },
    getPhoneNumber: function (e) {

      var t = this;
      wx.login({
        success: function (o) {
          var d = {
            code: o.code,
            vi: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            session_key: wx.getStorageSync("user").session_key,
            uid: wx.getStorageSync("user").id
          }
          http.post('userset', d).then(data => {
            t.setData({ mobile: data });
            wx.showToast({
              title: '授权成功',
              duration: 2500,
              icon: "none",
            })
            setTimeout(function(){
              wx.navigateTo({
                url: '../u/index',
              })
            },2500);
          });
        }
      })
    },
});