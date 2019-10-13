function e(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}(),
    r = e(require("../etc/config")),
    i = e(require("WxResource")),
    o = function() {
        function e(n, r, i, o) {
            t(this, e), Object.assign(this, {
                url: n,
                paramDefaults: r,
                actions: i,
                options: o
            })
        }
        return n(e, [{
            key: "init",
            value: function() {
                var e = new i.
                default (this.setUrl(this.url), this.paramDefaults, this.actions, this.options);
                return e.setDefaults({
                    interceptors: this.setInterceptors()
                }), e
            }
        }, {
            key: "setUrl",
            value: function(e) {
                return "" + r.
                default.basePath + e
            }
        }, {
            key: "setInterceptors",
            value: function() {
                return [{
                    request: function(e) {
                        return e.header = e.header || {}, e.requestTimestamp = (new Date).getTime(), e.header["content-type"] = "application/x-www-form-urlencoded", e.header.Cookie = "loginSession=" + wx.getStorageSync("loginSession"), wx.showNavigationBarLoading(), e
                    },
                    requestError: function(e) {
                        return wx.hideNavigationBarLoading(), e
                    },
                    response: function(e) {
                        return e.responseTimestamp = (new Date).getTime(), wx.hideNavigationBarLoading(), e
                    },
                    responseError: function(e) {
                        return wx.hideNavigationBarLoading(), e
                    }
                }]
            }
        }]), e
    }();
exports.
default = o;