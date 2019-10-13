function e(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }
}(),
    i = e(require("ServiceBase")),
    a = e(require("../etc/config")),
    u = function(e) {
        function u() {
            t(this, u);
            var e = r(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
            return e.$$prefix = "", e.$$path = {
                wechatSignUp: "/love/exit.html?siteid=" + a.
                default.siteid,
                decryptData: "/decrypt.html?siteid=" + a.
                default.siteid
            }, e
        }
        return n(u, i.
        default), o(u, [{
            key: "wechatSignUp",
            value: function(e) {
                return this.postRequest(this.$$path.wechatSignUp, e)
            }
        }, {
            key: "wechatDecryptData",
            value: function(e) {
                return this.postRequest(this.$$path.decryptData, e)
            }
        }, {
            key: "wechatSetFormid",
            value: function(e) {
                return wx.request({
                    url: a.
                    default.basePath + "/love_formId",
                    data: e,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        Cookie: "loginSession=" + wx.getStorageSync("loginSession")
                    },
                    success: function() {}
                })
            }
        }]), u
    }();
exports.
default = u;