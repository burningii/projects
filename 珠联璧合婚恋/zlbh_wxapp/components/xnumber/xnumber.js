function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}(require("../component"));
exports.
default = {
    setDefaults: function() {
        return {
            min: void 0,
            max: void 0,
            step: 1,
            value: 0,
            disabled: !0,
            longpress: !1,
            className: void 0,
            callback: function() {}
        }
    },
    init: function(i) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = null,
            u = Object.assign({
                id: i
            }, this.setDefaults(), a);
        new e.
        default ({
            scope: "$wux.xnumber." + i,
            data: u,
            methods: {
                updateValues: function(e) {
                    var a, n = this.getComponentData();
                    n.min && e < n.min && (e = n.min), n.max && e > n.max && (e = n.max), this.page.setData((a = {}, t(a, "$wux.xnumber." + i + ".value", e), t(a, "$wux.xnumber." + i + ".disabledMin", void 0 !== n.min && e <= n.min), t(a, "$wux.xnumber." + i + ".disabledMax", void 0 !== n.max && e >= n.max), a)), "function" == typeof u.callback && u.callback(e)
                },
                calculation: function(t, e) {
                    var i = this,
                        a = this.getComponentData();
                    if ("add" === t) {
                        if (a.disabledMax) return !1;
                        this.updateValues(a.value + a.step)
                    }
                    if ("sub" === t) {
                        if (a.disabledMin) return !1;
                        this.updateValues(a.value - a.step)
                    }
                    u.longpress && e && (this.timeout = setTimeout(function() {
                        return i.calculation(t, e)
                    }, 100))
                },
                bindinput: function(t) {
                    var e = this;
                    n && clearTimeout(n), n = setTimeout(function() {
                        e.updateValues(Number(t.detail.value) || 0)
                    }, 300)
                },
                bindtouchstart: function(t) {
                    this.startTime = t.timeStamp
                },
                bindtouchend: function(t) {
                    this.endTime = t.timeStamp, this.timeout && clearTimeout(this.timeout)
                },
                touchcancel: function(t) {
                    this.endTime = t.timeStamp, this.timeout && clearTimeout(this.timeout)
                },
                bindlongtap: function(t) {
                    var e = t.currentTarget.dataset.type;
                    u.longpress && this.calculation(e, !0)
                },
                bindtap: function(t) {
                    var e = t.currentTarget.dataset.type,
                        i = this.endTime - this.startTime < 350;
                    (!u.longpress || u.longpress && i) && this.calculation(e, !1)
                }
            }
        }).updateValues(u.value)
    }
};