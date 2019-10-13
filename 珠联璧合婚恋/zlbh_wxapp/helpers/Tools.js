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
    r = function() {
        function r() {
            e(this, r)
        }
        return n(r, [{
            key: "getFilenameExt",
            value: function(e) {
                var t = e.name.split(".");
                return t[t.length - 1]
            }
        }, {
            key: "rand",
            value: function(e, t) {
                return Math.floor(Math.random() * (t - e + 1) + e)
            }
        }, {
            key: "randString",
            value: function(e) {
                var t = "",
                    n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                for (e = e || 1; e--;) t += n.charAt(this.rand(0, n.length - 1));
                return t
            }
        }, {
            key: "randFilename",
            value: function(e) {
                return this.randString(this.rand(10, 100)) + Date.parse(new Date) + "." + this.getFilenameExt(e)
            }
        }, {
            key: "isString",
            value: function(e) {
                return "string" == typeof e
            }
        }, {
            key: "isFunction",
            value: function(e) {
                return "function" === this.type(e)
            }
        }, {
            key: "isArray",
            value: function(e) {
                return Array.isArray(e)
            }
        }, {
            key: "isObject",
            value: function(e) {
                return null !== e && "object" === (void 0 === e ? "undefined" : t(e))
            }
        }, {
            key: "isNumber",
            value: function(e) {
                return "number" == typeof e
            }
        }, {
            key: "isDate",
            value: function(e) {
                return "[object Date]" === this.type(e)
            }
        }, {
            key: "isRegExp",
            value: function(e) {
                return "[object RegExp]" === this.type(e)
            }
        }, {
            key: "isFile",
            value: function(e) {
                return "[object File]" === this.type(e)
            }
        }, {
            key: "isFormData",
            value: function(e) {
                return "[object FormData]" === this.type(e)
            }
        }, {
            key: "isBlob",
            value: function(e) {
                return "[object Blob]" === this.type(e)
            }
        }, {
            key: "isBoolean",
            value: function(e) {
                return "boolean" == typeof e
            }
        }, {
            key: "isPromiseLike",
            value: function(e) {
                return e && this.isFunction(e.then)
            }
        }, {
            key: "isTypedArray",
            value: function(e) {
                var t = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
                return e && this.isNumber(e.length) && t.test(this.type(e))
            }
        }, {
            key: "isArrayBuffer",
            value: function(e) {
                return "[object ArrayBuffer]" === this.type(e)
            }
        }, {
            key: "isDefined",
            value: function(e) {
                return void 0 !== e
            }
        }, {
            key: "isUndefined",
            value: function(e) {
                return void 0 === e
            }
        }, {
            key: "isNull",
            value: function(e) {
                return null === e
            }
        }, {
            key: "isFinite",
            value: function(e) {
                function t(t) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e) {
                return "number" == typeof e && isFinite(e)
            })
        }, {
            key: "isNaN",
            value: function(e) {
                return this.isNumber(e) && e != +e
            }
        }, {
            key: "isError",
            value: function(e) {
                return "[object Error]" === this.type(e)
            }
        }, {
            key: "trim",
            value: function(e) {
                return this.isString(e) ? e.trim() : e
            }
        }, {
            key: "escapeForRegexp",
            value: function(e) {
                return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
            }
        }, {
            key: "makeMap",
            value: function(e) {
                for (var t = {}, n = e.split(","), r = 0; r < n.length; r++) t[n[r]] = !0;
                return t
            }
        }, {
            key: "includes",
            value: function(e, t) {
                return -1 != Array.prototype.indexOf.call(e, t)
            }
        }, {
            key: "arrayRemove",
            value: function(e, t) {
                var n = e.indexOf(t);
                return n >= 0 && e.splice(n, 1), n
            }
        }, {
            key: "addDateMinutes",
            value: function(e, t) {
                return (e = new Date(e.getTime())).setMinutes(e.getMinutes() + t || 0), e
            }
        }, {
            key: "toJson",
            value: function(e, t) {
                if (!this.isUndefined(e)) return this.isNumber(t) || (t = t ? 2 : null), JSON.stringify(e, null, t)
            }
        }, {
            key: "fromJson",
            value: function(e) {
                return this.isString(e) ? JSON.parse(e) : e
            }
        }, {
            key: "extend",
            value: function() {
                var e = void 0,
                    n = void 0,
                    r = void 0,
                    i = void 0,
                    u = void 0,
                    o = void 0,
                    a = arguments[0] || {}, l = 1,
                    c = arguments.length,
                    f = !1;
                for ("boolean" == typeof a && (f = a, a = arguments[l] || {}, l++), "object" === (void 0 === a ? "undefined" : t(a)) || this.isFunction(a) || (a = {}), l === c && (a = this, l--); l < c; l++) if (null != (u = arguments[l])) for (i in u) e = a[i], a !== (r = u[i]) && (f && r && (this.isPlainObject(r) || (n = this.isArray(r))) ? (n ? (n = !1, o = e && this.isArray(e) ? e : []) : o = e && this.isPlainObject(e) ? e : {}, a[i] = this.extend(f, o, r)) : void 0 !== r && (a[i] = r));
                return a
            }
        }, {
            key: "isPlainObject",
            value: function(e) {
                var t = Object.getPrototypeOf,
                    n = {}, r = n.hasOwnProperty,
                    i = r.toString,
                    u = i.call(Object),
                    o = void 0,
                    a = void 0;
                return !(!e || "[object Object]" !== this.type(e)) && (!(o = t(e)) || "function" == typeof(a = r.call(o, "constructor") && o.constructor) && i.call(a) === u)
            }
        }, {
            key: "isEmptyObject",
            value: function(e) {
                for (var t in e) return !1;
                return !0
            }
        }, {
            key: "type",
            value: function(e) {
                var n = Object.prototype.toString;
                return null == e ? e + "" : "object" === (void 0 === e ? "undefined" : t(e)) || "function" == typeof e ? n.call(e) || "object" : void 0 === e ? "undefined" : t(e)
            }
        }, {
            key: "merge",
            value: function() {
                return Object.assign.apply(Object, arguments)
            }
        }, {
            key: "clone",
            value: function(e) {
                if ("object" !== (void 0 === e ? "undefined" : t(e)) || !e) return e;
                var n = {};
                for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
                return n
            }
        }, {
            key: "omit",
            value: function(e, t) {
                var n = this.clone(e);
                return t.forEach(function(e) {
                    delete n[e]
                }), n
            }
        }, {
            key: "pluck",
            value: function(e, n) {
                return "object" !== (void 0 === e ? "undefined" : t(e)) || 0 === e.length ? [] : n ? e.map(function(e) {
                    return e[n]
                }) : e
            }
        }, {
            key: "serializeValue",
            value: function(e) {
                return this.isObject(e) ? this.isDate(e) ? e.toISOString() : this.toJson(e) : e
            }
        }, {
            key: "encodeUriQuery",
            value: function(e, t) {
                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, t ? "%20" : "+")
            }
        }, {
            key: "paramSerializer",
            value: function(e) {
                if (!e) return "";
                var n = this,
                    r = [];
                for (var i in e) {
                    var u = function(t) {
                        var i = e[t];
                        if (null === i || n.isUndefined(i)) return {
                            v: void 0
                        };
                        n.isArray(i) ? i.forEach(function(e) {
                            r.push(n.encodeUriQuery(t) + "=" + n.encodeUriQuery(n.serializeValue(e)))
                        }) : r.push(n.encodeUriQuery(t) + "=" + n.encodeUriQuery(n.serializeValue(i)))
                    }(i);
                    if ("object" === (void 0 === u ? "undefined" : t(u))) return u.v
                }
                return r.join("&")
            }
        }, {
            key: "buildUrl",
            value: function(e, t) {
                var n = this.paramSerializer(t);
                return n.length > 0 && (e += (-1 == e.indexOf("?") ? "?" : "&") + n), e
            }
        }]), r
    }();
exports.
default = r;