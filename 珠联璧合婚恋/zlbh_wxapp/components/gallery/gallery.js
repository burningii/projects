function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}(require("../component"));
exports.
default = {
    setDefaults: function() {
        var t;
        return t = {
            current: 0,
            urls: []
        }, e(t, "delete", function() {}), e(t, "cancel", function() {}), t
    },
    show: function() {
        var n, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = Object.assign({}, this.setDefaults(), i),
            u = new t.
        default ({
            scope: "$wux.gallery",
            data: r,
            methods: (n = {
                hide: function() {
                    if (this.removed) return !1;
                    this.removed = !0, this.setHidden("weui-animate-slide-left"), "function" == typeof r.cancel && r.cancel()
                },
                show: function() {
                    if (this.removed) return !1;
                    this.setVisible("weui-animate-slide-right")
                }
            }, e(n, "delete", function(e) {
                "function" == typeof r.delete && !0 === r.delete(this.getComponentData().current, r.urls) && this.hide()
            }), e(n, "bindchange", function(t) {
                this.setData(e({}, "$wux.gallery.current", t.detail.current))
            }), n)
        });
        return u.show(), u.hide
    }
};