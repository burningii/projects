function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, n = function() {
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
    r = function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }(require("../utils/es6-promise.min")),
    o = function() {
        function o() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            e(this, o), Object.assign(this, {
                url: t,
                paramDefaults: n,
                actions: r,
                options: i
            }), this.__init()
        }
        return n(o, [{
            key: "__init",
            value: function() {
                this.__initTools(), this.__initDefaults(), this.__initResource()
            }
        }, {
            key: "__initTools",
            value: function() {
                this.__tools = {
                    isArray: function(e) {
                        return Array.isArray(e)
                    },
                    isFunction: function(e) {
                        return "function" == typeof e
                    },
                    isDefined: function(e) {
                        return void 0 !== e
                    },
                    isObject: function(e) {
                        return null !== e && "object" === (void 0 === e ? "undefined" : t(e))
                    },
                    type: function(e) {
                        var n = Object.prototype.toString;
                        return null == e ? e + "" : "object" === (void 0 === e ? "undefined" : t(e)) || "function" == typeof e ? n.call(e) || "object" : void 0 === e ? "undefined" : t(e)
                    },
                    clone: function(e) {
                        if ("object" !== (void 0 === e ? "undefined" : t(e)) || !e) return e;
                        var n = {};
                        for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
                        return n
                    },
                    each: function(e, t) {
                        var n = void 0,
                            r = void 0;
                        if (e && "number" == typeof e.length) for (n = 0; n < e.length; n++) t.call(e[n], e[n], n);
                        else if (this.isObject(e)) for (r in e) e.hasOwnProperty(r) && t.call(e[r], e[r], r);
                        return e
                    },
                    isPlainObject: function(e) {
                        var t = Object.getPrototypeOf,
                            n = {}, r = n.hasOwnProperty,
                            o = r.toString,
                            i = o.call(Object),
                            u = void 0,
                            s = void 0;
                        return !(!e || "[object Object]" !== this.type(e)) && (!(u = t(e)) || "function" == typeof(s = r.call(u, "constructor") && u.constructor) && o.call(s) === i)
                    },
                    extend: function() {
                        var e = void 0,
                            n = void 0,
                            r = void 0,
                            o = void 0,
                            i = void 0,
                            u = void 0,
                            s = arguments[0] || {}, a = 1,
                            l = arguments.length,
                            c = !1;
                        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" === (void 0 === s ? "undefined" : t(s)) || this.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++) if (null != (i = arguments[a])) for (o in i) e = s[o], s !== (r = i[o]) && (c && r && (this.isPlainObject(r) || (n = isArray(r))) ? (n ? (n = !1, u = e && isArray(e) ? e : []) : u = e && this.isPlainObject(e) ? e : {}, s[o] = this.extend(c, u, r)) : void 0 !== r && (s[o] = r));
                        return s
                    },
                    encodeUriSegment: function(e) {
                        return this.encodeUriQuery(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
                    },
                    encodeUriQuery: function(e, t) {
                        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
                    }
                }
            }
        }, {
            key: "__initDefaults",
            value: function() {
                this.defaults = {
                    interceptors: [{
                        request: function(e) {
                            return e
                        },
                        requestError: function(e) {
                            return e
                        },
                        response: function(e) {
                            return e
                        },
                        responseError: function(e) {
                            return e
                        }
                    }],
                    stripTrailingSlashes: !0,
                    suffix: "Async",
                    actions: {
                        get: {
                            method: "GET"
                        },
                        save: {
                            method: "POST"
                        },
                        update: {
                            method: "PUT"
                        },
                        query: {
                            method: "GET"
                        },
                        remove: {
                            method: "DELETE"
                        },
                        delete: {
                            method: "DELETE"
                        }
                    }
                }
            }
        }, {
            key: "__initRoute",
            value: function(e, t) {
                function n(e, t) {
                    this.template = e, this.defaults = r.__tools.extend({}, r.defaults, t), this.urlParams = {}
                }
                var r = this,
                    o = /^https?:\/\/[^\/]*/;
                return n.prototype = {
                    setUrlParams: function(e, t, n) {
                        var i = this,
                            u = n || i.template,
                            s = void 0,
                            a = void 0,
                            l = "",
                            c = i.urlParams = {};
                        r.__tools.each(u.split(/\W/), function(e, t) {
                            if ("hasOwnProperty" === e) throw "hasOwnProperty is not a valid parameter name.";
                            !new RegExp("^\\d+$").test(e) && e && new RegExp("(^|[^\\\\]):" + e + "(\\W|$)").test(u) && (c[e] = {
                                isQueryParamValue: new RegExp("\\?.*=:" + e + "(?:\\W|$)").test(u)
                            })
                        }), u = u.replace(/\\:/g, ":"), u = u.replace(o, function(e) {
                            return l = e, ""
                        }), t = t || {}, r.__tools.each(i.urlParams, function(e, n) {
                            s = t.hasOwnProperty(n) ? t[n] : i.defaults[n], r.__tools.isDefined(s) && null !== s ? (a = e.isQueryParamValue ? r.__tools.encodeUriQuery(s, !0) : r.__tools.encodeUriSegment(s), u = u.replace(new RegExp(":" + n + "(\\W|$)", "g"), function(e, t) {
                                return a + t
                            })) : u = u.replace(new RegExp("(/?):" + n + "(\\W|$)", "g"), function(e, t, n) {
                                return "/" === n.charAt(0) ? n : t + n
                            })
                        }), i.defaults.stripTrailingSlashes && (u = u.replace(/\/+$/, "") || "/"), u = u.replace(/\/\.(?=\w+($|\?))/, "."), e.url = l + u.replace(/\/\\\./, "/."), r.__tools.each(t, function(t, n) {
                            i.urlParams[n] || (e.data = e.data || {}, e.data[n] = t)
                        })
                    }
                }, new n(e, t)
            }
        }, {
            key: "__initResource",
            value: function() {
                var e = this,
                    t = this.__initRoute(this.url, this.options),
                    n = this.__tools.extend({}, this.defaults.actions, this.actions);
                for (var r in n)! function(r) {
                    e[r + t.defaults.suffix] = function() {
                        for (var o = arguments.length, i = Array(o), u = 0; u < o; u++) i[u] = arguments[u];
                        var s = e.__setHttpConfig.apply(e, [t, n[r]].concat(i));
                        return e.__defaultRequest(s)
                    }
                }(r)
            }
        }, {
            key: "__setHttpConfig",
            value: function(e, t) {
                var n = this,
                    r = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/,
                    o = function(e) {
                        return null != e && "" !== e && "hasOwnProperty" !== e && r.test("." + e)
                    }, i = function(e, t) {
                        if (!o(t)) throw "badmember, Dotted member path " + t + " is invalid.";
                        for (var r = t.split("."), i = 0, u = r.length; i < u && n.__tools.isDefined(e); i++) {
                            var s = r[i];
                            e = null !== e ? e[s] : void 0
                        }
                        return e
                    }, u = {}, s = {}, a = {}, l = /^(POST|PUT|PATCH)$/i.test(t.method);
                switch (arguments.length <= 2 ? 0 : arguments.length - 2) {
                    case 2:
                        u = arguments.length <= 2 ? void 0 : arguments[2], s = arguments.length <= 3 ? void 0 : arguments[3];
                        break;
                    case 1:
                        l ? s = arguments.length <= 2 ? void 0 : arguments[2] : u = arguments.length <= 2 ? void 0 : arguments[2];
                        break;
                    case 0:
                        break;
                    default:
                        throw "Expected up to 2 arguments [params, data, success, error], got " + (arguments.length <= 2 ? 0 : arguments.length - 2) + " arguments"
                }
                for (var c in t) switch (c) {
                    default: a[c] = this.__tools.clone(t[c]);
                    break;
                    case "params":
                }
                return l && (a.data = s), e.setUrlParams(a, this.__tools.extend({}, function(e, t) {
                    var r = {};
                    t = n.__tools.extend({}, n.paramDefaults, t);
                    for (var o in t) {
                        var u = t[o];
                        n.__tools.isFunction(u) && (u = u(e)), r[o] = u && u.charAt && "@" === u.charAt(0) ? i(e, u.substr(1)) : u
                    }
                    return r
                }(s, t.params || {}), u), t.url), a
            }
        }, {
            key: "__defaultRequest",
            value: function(e) {
                var t = function(e, t) {
                    for (var n = 0, r = t.length; n < r;) {
                        var o = t[n++],
                            i = t[n++];
                        e = e.then(o, i)
                    }
                    return e
                }, n = [],
                    r = [],
                    o = this.defaults.interceptors,
                    i = this.__resolve(e);
                return o.forEach(function(e, t) {
                    (e.request || e.requestError) && n.push(e.request, e.requestError), (e.response || e.responseError) && r.unshift(e.response, e.responseError)
                }), i = t(i, n), i = i.then(this.__http), i = t(i, r), i = i.then(function(e) {
                    return e.data
                }, function(e) {
                    return e
                })
            }
        }, {
            key: "__http",
            value: function(e) {
                return new r.
                default.Promise(function(t, n) {
                    var r = {};
                    r.siteid = wx.getStorageSync("siteid"), e.data = Object.assign(e.data || {}, r), e.success = function(e) {
                        return t(e)
                    }, e.fail = function(e) {
                        return n(e)
                    }, wx.request(e)
                })
            }
        }, {
            key: "__resolve",
            value: function(e) {
                return new r.
                default.Promise(function(t, n) {
                    t(e)
                })
            }
        }, {
            key: "__reject",
            value: function(e) {
                return new r.
                default.Promise(function(t, n) {
                    n(e)
                })
            }
        }, {
            key: "setDefaults",
            value: function(e) {
                this.__tools.extend(this.defaults, e)
            }
        }]), o
    }();
exports.
default = o;