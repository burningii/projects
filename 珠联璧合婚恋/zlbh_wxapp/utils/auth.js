var e = getApp();
module.exports = {
    getSetting: function() {
        return e.WxService.getSetting().then(function(e) {
            return console.log(e), e.authSetting
        })
    },
    authorization: function() {
        wx.showModal({
            title: "警告",
            content: "您需要授权微信登录，才能使用小程序功能；若不授权微信登录，则无法使用；点击获取授权，勾选用户信息，则可使用。",
            showCancel: !1,
            confirmText: "授权",
            success: function(t) {
                e.WxService.navigateTo("/pages/decrypt/index")
            }
        })
    },
    wechatDecryptData: function() {
        var t = void 0;
        return e.WxService.login().then(function(n) {
            return console.log("wechatDecryptData", n.code), t = n.code, e.WxService.getUserInfo()
        }).then(function(n) {
            return e.HttpService.wechatDecryptData({
                encryptedData: n.encryptedData,
                iv: n.iv,
                rawData: n.rawData,
                signature: n.signature,
                code: t
            })
        }).then(function(t) {
            if (console.log(t), 200 == t.code) return e.WxService.setStorageSync("loginSession", t.data.loginSession), e.WxService.setStorageSync("us", t.data.us), e.WxService.getStorageSync("loginSession");
            e.WxService.showModal({
                content: t.data,
                showCancel: !1
            }), e.WxService.removeStorageSync("loginSession")
        }).
        catch (function(t) {
            console.log("嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻"), e.WxService.navigateTo("/pages/decrypt/index")
        })
    },
    wechatAreaData: function() {
        e.WxService.getLocation().then(function(t) {
            var n = t.latitude,
                o = t.longitude;
            return e.HttpResource("/savearea.html").saveAsync({
                latitude: n,
                longitude: o
            }).then(function(t) {
                500 == t.code ? (e.WxService.showModal({
                    content: t.data,
                    showCancel: !1
                }), wx.removeStorageSync("userlocation")) : wx.setStorageSync("userlocation", n + "," + o)
            }).
            catch (function(e) {
                console.log(e)
            })
        }).
        catch (function(e) {
            console.log(e)
        })
    }
};