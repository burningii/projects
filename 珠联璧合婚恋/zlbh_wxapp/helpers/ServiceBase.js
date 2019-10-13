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
    i = e(require("../utils/es6-promise.min")),
    o = function() {
        function e() {
            t(this, e), Object.assign(this, {
                $$basePath: r.
                default.basePath
            }), this.__init()
        }
        return n(e, [{
            key: "__init",
            value: function() {
                this.__initDefaults(), this.__initMethods()
            }
        }, {
            key: "__initDefaults",
            value: function() {
                this.suffix = "Request", this.instanceSource = {
                    method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]
                }
            }
        }, {
            key: "__initMethods",
            value: function() {
                var e = this;
                for (var t in this.instanceSource) this.instanceSource[t].forEach(function(t, n) {
                    e[t.toLowerCase() + e.suffix] = function() {
                        for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        return e.__defaultRequest.apply(e, [t].concat(r))
                    }
                })
            }
        }, {
            key: "__defaultRequest",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "json",
                    o = Object.assign({}, this.setHeaders(), r),
                    u = function(e, t) {
                        for (var n = 0, r = t.length; n < r;) {
                            var i = t[n++],
                                o = t[n++];
                            e = e.then(i, o)
                        }
                        return e
                    }, a = {
                        url: this.setUrl(t),
                        data: n,
                        header: o,
                        method: e,
                        dataType: i
                    }, s = [],
                    c = [],
                    f = this.setInterceptors(),
                    h = this.__resolve(a);
                return f.forEach(function(e, t) {
                    (e.request || e.requestError) && s.push(e.request, e.requestError), (e.response || e.responseError) && c.unshift(e.response, e.responseError)
                }), h = u(h, s), h = h.then(this.__http), h = u(h, c), h = h.then(function(e) {
                    return e.data
                }, function(e) {
                    return e
                })
            }
        }, {
            key: "__http",
            value: function(e) {
                return new i.
                default.Promise(function(t, n) {
                    e.success = function(e) {
                        return t(e)
                    }, e.fail = function(e) {
                        return n(e)
                    }, wx.request(e)
                })
            }
        }, {
            key: "__resolve",
            value: function(e) {
                return new i.
                default.Promise(function(t, n) {
                    t(e)
                })
            }
        }, {
            key: "__reject",
            value: function(e) {
                return new i.
                default.Promise(function(t, n) {
                    n(e)
                })
            }
        }, {
            key: "setUrl",
            value: function(e) {
                return "" + this.$$basePath + this.$$prefix + e
            }
        }, {
            key: "setHeaders",
            value: function() {
                return {
                    Authorization: "Bearer " + wx.getStorageSync("token")
                }
            }
        }, {
            key: "setInterceptors",
            value: function() {
                return [{
                    request: function(e) {
                        return e.header = e.header || {}, e.requestTimestamp = (new Date).getTime(), -1 !== e.url.indexOf("/api") && wx.getStorageSync("token") && (e.header.Authorization = "Bearer " + wx.getStorageSync("token")), wx.showNavigationBarLoading(), e
                    },
                    requestError: function(e) {
                        return wx.hideNavigationBarLoading(), e
                    },
                    response: function(e) {
                        return e.responseTimestamp = (new Date).getTime(), 401 === e.statusCode && (wx.removeStorageSync("token"), wx.redirectTo({
                            url: "/pages/login/index"
                        })), wx.hideNavigationBarLoading(), e
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