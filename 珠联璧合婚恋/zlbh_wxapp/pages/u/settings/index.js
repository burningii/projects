var t = getApp(),
    o = require("../../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../../util/request.js';     
Page({
    data: {},
    onLoad: function(i) {
        this.$wuxToast = t.Wux().$wuxToast;
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data, avatar: data.avatar });
        });
        http.get('config').then(data => {
          this.setData({ config: data });
        });
    },
    onShow: function() {},
    didNotification: function(t) {
        this.setData({
            "form.phone": t.mobile
        })
    },
    renderForm: function(t) {
        var o = this;
        this.getSettingsData.getAsync({
            action: "do"
        }).then(function(t) {
            200 == t.code && o.setData({
                form: t.data.userinfo
            })
        })
    },
    submitForm: function(t) {
      var i = t.detail.value,
            e = this;
        i.isinfo = i.isinfo ? 1 : 0;
        i.is_closewxmsg = i.is_closewxmsg ? 1 : 0;
        i.uid=wx.getStorageSync("user").id;    
        "" != i.wechat || "" != i.qq  ? http.post('edlink' , i).then(data => {
          wx.showToast({
            title: "修改成功",
            duration: 2500,
            icon: "none",
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../index',
            })
          }, 2500);
        })  : wx.showToast({
            title: "微信或QQ号必须填写一项",
            duration:2500,
            icon:"none",
        })
    },
    getInfoState: function(t) {
        console.log(t.detail.value)
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
    showToastCancel: function(t, o) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return o
            }
        })
    }
});