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
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}(),
    i = e(require("Tools")),
    o = e(require("../utils/es6-promise.min")),
    r = function() {
        function e() {
            t(this, e), this.__init()
        }
        return n(e, [{
            key: "__init",
            value: function() {
                this.tools = new i.
                default, this.__initDefaults(), this.__initMethods()
            }
        }, {
            key: "__initDefaults",
            value: function() {
                this.noPromiseMethods = ["stopRecord", "pauseVoice", "stopVoice", "pauseBackgroundAudio", "stopBackgroundAudio", "showNavigationBarLoading", "hideNavigationBarLoading", "createAnimation", "createContext", "hideKeyboard", "stopPullDownRefresh"], this.instanceSource = {
                    method: Object.keys(wx)
                }
            }
        }, {
            key: "__initMethods",
            value: function() {
                var e = this;
                for (var t in this.instanceSource) this.instanceSource[t].forEach(function(t, n) {
                    e[t] = function() {
                        for (var n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                        if (-1 !== e.noPromiseMethods.indexOf(t) || "on" === t.substr(0, 2) || /\w+Sync$/.test(t)) {
                            var r;
                            return (r = wx)[t].apply(r, i)
                        }
                        return e.__defaultRequest.apply(e, [t].concat(i))
                    }
                });
                this.navigateTo = function(t, n) {
                    var i = e.tools.buildUrl(t, n);
                    return new o.
                    default.Promise(function(e, t) {
                        wx.navigateTo({
                            url: i,
                            success: function(t) {
                                return e(t)
                            },
                            fail: function(e) {
                                return t(e)
                            }
                        })
                    })
                }, this.redirectTo = function(t, n) {
                    var i = e.tools.buildUrl(t, n);
                    return new o.
                    default.Promise(function(e, t) {
                        wx.redirectTo({
                            url: i,
                            success: function(t) {
                                return e(t)
                            },
                            fail: function(e) {
                                return t(e)
                            }
                        })
                    })
                }
            }
        }, {
            key: "__defaultRequest",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new o.
                default.Promise(function(n, i) {
                    t.success = function(e) {
                        return n(e)
                    }, t.fail = function(e) {
                        return i(e)
                    }, wx[e](t)
                })
            }
        }]), e
    }();
exports.
default = r;