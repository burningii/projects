var e = require("./bluebird");
module.exports = {
    login: function() {
        return new e(function(e, n) {
            wx.login({
                success: e,
                fail: n
            })
        })
    },
    getUserInfo: function() {
        return new e(function(e, n) {
            wx.getUserInfo({
                success: e,
                fail: n
            })
        })
    },
    setStorage: function(n, t) {
        return new e(function(e, o) {
            wx.setStorage({
                key: n,
                data: t,
                success: e,
                fail: o
            })
        })
    },
    getStorage: function(n) {
        return new e(function(e, t) {
            wx.getStorage({
                key: n,
                success: e,
                fail: t
            })
        })
    },
    getLocation: function(n) {
        return new e(function(e, t) {
            wx.getLocation({
                type: n,
                success: e,
                fail: t
            })
        })
    },
    original: wx
};