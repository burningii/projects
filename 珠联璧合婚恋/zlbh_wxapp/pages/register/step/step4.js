function e(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, i = e(require("../../../helpers/WxValidate")),
    o = (e(require("../../../etc/config")), getApp());
Page({
    data: {
        mobile: {
            number: "",
            phone_verify_status: !1,
            phone_verify_expiry_time: 60,
            phone_verify_text: "获取验证码"
        }
    },
    onLoad: function(e) {
        var t = this;
        e.action && (this.action = e.action), this.mobileVerify = o.HttpResource("/sendmsg.html"), this.regquick = o.HttpResource("/quicklogin.html"), this.$wuxToast = o.Wux().$wuxToast, this.WxValidate_regquick = new i.
        default ({
            mobile: {
                required: !0,
                tel: !0
            },
            smsCaptcha: {
                required: !0,
                minlength: 6,
                maxlength: 6
            }
        }, {
            mobile: {
                required: "请输入手机号码"
            },
            smsCaptcha: {
                required: "请填写正确的验证码"
            }
        }), o.WxService.login().then(function(e) {
            t.code = e.code
        })
    },
    navigateTo: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        })
    },
    getPhoneReg: function(e) {
        var t = this,
            i = e.currentTarget.dataset.state,
            n = !1;
        o.WxService.login().then(function(e) {
            t.code = e.code
        }), n = "0" == i, this.setData({
            msglogin: n
        })
    },
    getPhoneNumber: function(e) {
        if (console.log(t(e.detail.encryptedData)), void 0 !== e.detail.encryptedData) return this.regquick.saveAsync({
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: this.code,
            form: JSON.stringify(o.WxService.getStorageSync("form"))
        }).then(function(e) {
            200 == e.code ? (o.WxService.setStorageSync("us", e.data.us), wx.reLaunch({
                url: "/pages/index/index"
            })) : o.WxService.showModal({
                content: e.data,
                showCancel: !1
            })
        }).
        catch (function(e) {
            console.log("嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻")
        })
    },
    submitForm_regquick: function(e) {
        var t = this;
        if (!o.WxService.getStorageSync("us")) {
            var i = this,
                n = (this.data.id, e.detail.value);
            if (n.form = JSON.stringify(o.WxService.getStorageSync("form")), !this.WxValidate_regquick.checkForm(e)) {
                var a = this.WxValidate_regquick.errorList[0];
                return i.showToastErr(a.msg), !1
            }
            n.action = this.action, this.regquick.saveAsync(n).then(function(e) {
                200 == e.code ? t.showToastSuc("注册成功", setTimeout(function() {
                    o.WxService.setStorageSync("us", e.data.us), wx.reLaunch({
                        url: "/pages/index/index"
                    })
                }, 1e3)) : t.showToastCancel(e.data)
            })
        }
    },
    bindMobile: function(e) {
        this.setData({
            "mobile.number": e.detail.value
        })
    },
    getChangeCode: function(e) {
        var t = this,
            i = this,
            o = this.data.mobile.number,
            n = /^(13|14|15|16|17|18|19)[0-9]{9}$/,
            a = {
                mobile: this.data.mobile.number
            };
        n.test(o) ? 0 == this.data.mobile.phone_verify_status && this.mobileVerify.saveAsync(a).then(function(e) {
            200 != e.code ? i.showToastErr(e.data) : t.getRecode()
        }) : i.showToastErr("请填写正确手机号")
    },
    getRecode: function() {
        var e = this,
            t = parseInt(e.data.mobile.phone_verify_expiry_time);
        e.setData({
            "mobile.phone_verify_status": !0
        }), t > 0 && e.setData({
            "mobile.phone_verify_text": t + "秒后重发"
        });
        var i = setInterval(function() {
            --t > 0 ? e.setData({
                "mobile.phone_verify_text": t + "秒后重发"
            }) : (e.setData({
                "mobile.phone_verify_status": !1,
                "mobile.phone_verify_text": "重新获取"
            }), clearInterval(i))
        }, 1e3)
    },
    showToastSuc: function(e, t) {
        this.$wuxToast.show({
            type: "success",
            timer: 1e3,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    showToastErr: function(e) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1e3,
            color: "#fff",
            text: "" + e
        })
    },
    showToastCancel: function(e) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1e3,
            color: "#fff",
            text: "" + e
        })
    }
});