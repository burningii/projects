function e(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
e(require("../../../helpers/WxValidate"));
var t = e(require("../../../etc/config")),
    a = getApp();
require("../../../utils/util.js");
const app = getApp()
import http from '../../util/request.js'; 
Page({
    data: {
        kefuTel: t.
        default.kefuTel,
        mobile: {
            number: "",
            phone_verify_status: !1,
            phone_verify_expiry_time: 60,
            phone_verify_text: "获取验证码"
        }
    },
    onLoad: function(e) {
      var that = this;
      this.$wuxToast = a.Wux().$wuxToast;
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data, avatar: data.avatar });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
        if (data.verify_photo != "") {
          this.setData({ verify_photo: data.verify_photo });
        }
      });
    },
    onShow: function() {
        
    },
    getTel: function() {
        var e = this;
        this.tel.getAsync().then(function(t) {
            200 == t.code && e.setData({
                kefuTel: t.data
            })
        })
    },
    getBuy: function() {
      wx.showToast({
        title: '认证提交成功，请等待审核',
        duration:1500,
        icon:"none"
      })
      setTimeout(function(){
        wx.navigateTo({
          url: '../index',
        })
      },1500);
    },
    renderForm: function() {
        var e = this;
        this.authData.getAsync({
            action: "do"
        }).then(function(t) {
            200 == t.code && e.setData({
                form: t.data
            })
        })
    },
    submitForm: function(e) {
        var t = this,
            a = e.detail.value;
        this.data.form;
        this.authSave.saveAsync(a).then(function(e) {
            200 == e.code ? t.showToastSuc(e.data, setTimeout(function() {
                wx.reLaunch({
                    url: "/pages/u/index"
                })
            }, 1500)) : t.showToastErr("" + e.data)
        })
    },
    getChangeCode: function(e) {
        var t = this,
            o = e.detail.value;
        "" != this.data.form.mobile ? 0 == this.data.mobile.phone_verify_status && (this.getRecode(), this.mobileVerify.saveAsync({
            action: "getauth"
        }, o).then(function(e) {
            200 != e.code && a.WxService.showToast({
                title: e.data,
                icon: "success",
                duration: 2e3
            })
        })) : t.showToastSuc("参数错误", setTimeout(function() {
            a.WxService.removeStorageSync("loginSession"), a.WxService.removeStorageSync("us"), wx.reLaunch({
                url: "/pages/u/index"
            })
        }, 1500))
    },
    getRecode: function() {
        var e = this,
            t = parseInt(e.data.mobile.phone_verify_expiry_time);
        e.setData({
            "mobile.phone_verify_status": !0
        }), t > 0 && e.setData({
            "mobile.phone_verify_text": t + "秒后重发"
        });
        var a = setInterval(function() {
            --t > 0 ? e.setData({
                "mobile.phone_verify_text": t + "秒后重发"
            }) : (e.setData({
                "mobile.phone_verify_status": !1,
                "mobile.phone_verify_text": "重新获取"
            }), clearInterval(a))
        }, 1e3)
    },
    showToastSuc: function(e, t) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    showToastErr: function(e, t) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    showToastCancel: function(e, t) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    onTel: function() {
        var e = this;
        a.WxService.showModal({
            title: "拨打电话",
            content: "是否给客服拨打电话"
        }).then(function(t) {
            return 1 == t.confirm && wx.makePhoneCall({
                phoneNumber: e.data.kefuTel || "0728-3319567"
            })
        })
    }
});