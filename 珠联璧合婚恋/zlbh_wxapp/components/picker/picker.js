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
}(require("../component")),
    n = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var a = e[n];
            "请选择" !== a.name && t.push(a.name)
        }
        return t.length ? t : [""]
    }, a = function(e) {
        return e.l2 ? n(e.l2) : [""]
    };
exports.
default = {
    setDefaults: function() {
        return {
            title: "请选择",
            cols: [],
            value: [],
            toolbar: !0,
            toolbarCloseText: "完成",
            onChange: function() {}
        }
    },
    temp: {},
    init: function(n) {
        var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = this,
            o = function() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = [], a = [], u = [], i = 0; i < e.length; i++) if (e[i]) {
                    var o = e[i].values || [],
                        l = e[i].displayValues || [],
                        r = t[i];
                    a.push(void 0 !== o[r] ? r : 0), n.push(void 0 !== o[r] ? o[r] : o[0]), u.push(void 0 !== l[r] ? l[r] : void 0)
                }
                return !(n.indexOf(void 0) >= 0) && {
                    value: n,
                    valueIndex: a,
                    displayValue: u
                }
            }, l = {}, r = Object.assign({}, this.setDefaults(), u);
        r.value = o(r.cols, r.value).valueIndex;
        var s = new t.
        default ({
            scope: "$wux.picker." + n,
            data: r,
            methods: {
                hide: function(e) {
                    this.setHidden(["weui-animate-slide-down", "weui-animate-fade-out"])
                },
                show: function() {
                    this.setVisible(["weui-animate-slide-up", "weui-animate-fade-in"])
                },
                bindChange: function(e) {
                    this.render(e.detail.value)
                },
                updateValue: o,
                render: function() {
                    var t = this,
                        u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                        o = this.getComponentData().cols;
                    "object" == typeof r.data && (void 0 === l.industry && (l.industry = r.data.map(function(e) {
                        return e.name
                    })[0]), o[0].values[u[0]] !== l.industry && (o[1].values = a(r.data[u[0]]), l.industry = o[0].values[u[0]])),
                    function(a, u) {
                        var o, l = t.updateValue(a, u);
                        i.temp[n] = u, t.setData((o = {}, e(o, "$wux.picker." + n + ".cols", a), e(o, "$wux.picker." + n + ".value", l.valueIndex), o)), "function" == typeof r.onChange && r.onChange(l)
                    }(o, u)
                }
            }
        });
        s.show(), s.render(i.temp[n] || r.value)
    }
};