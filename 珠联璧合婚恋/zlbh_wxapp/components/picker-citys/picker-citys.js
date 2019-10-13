function e(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
function t(e, t, n) {
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
var n = e(require("../component")),
    r = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var r = e[n];
            "请选择" !== r.name && t.push(r.name)
        }
        return t.length ? t : [""]
    }, u = function(e) {
        return e.l2 ? r(e.l2) : [""]
    }, i = function(e) {
        for (var t = 0; t < c.length; t++) if (c[t].name === e) return u(c[t]);
        return [""]
    }, a = function(e) {
        var t = [];
        return c.forEach(function(n, r) {
            n.id == e[0] && (t[0] = r, n.l2.forEach(function(n, r) {
                n.id == e[1] && (t[1] = r)
            }))
        }), t
    }, o = function(e) {
        var t = [];
        return c.forEach(function(n, r) {
            e[0] == r && (t[0] = n.id, n.l2.forEach(function(n, r) {
                e[1] == r && (t[1] = n.id)
            }))
        }), t
    }, c = e(require("./data")).
default, l = c.map(function(e) {
    return e.name
}), v = l[0], s = u(c[0]), f = s[0];
exports.
default = {
    setDefaults: function() {
        return {
            title: "请选择",
            cols: [{
                values: l,
                className: "col-province"
            }, {
                values: s,
                className: "col-city"
            }],
            value: [],
            toolbar: !0,
            toolbarCloseText: "完成",
            onChange: function() {}
        }
    },
    temp: {},
    init: function(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, u = this,
            c = function() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = [], r = [], u = [], i = 0; i < e.length; i++) if (e[i]) {
                    var a = e[i].values || [],
                        c = e[i].displayValue || [],
                        l = t[i];
                    r.push(void 0 !== a[l] ? l : 0), n.push(void 0 !== a[l] ? a[l] : a[0]), u.push(void 0 !== c[l] ? c[l] : void 0)
                }
                return !(n.indexOf(void 0) >= 0) && {
                    text: n,
                    value: o(r),
                    valueIndex: r,
                    displayValue: u
                }
            }, d = u.temp[e] = u.temp[e] ? u.temp[e] : {
                currentProvince: v,
                currentCity: f
            }, p = Object.assign({}, this.setDefaults(), r);
        p.value = c(p.cols, a(p.value)).valueIndex, p.cols = d && d.cols || p.cols, p.currentProvince = l[0], p.currentCity = s[0], new n.
        default ({
            scope: "$wux.pickerCity." + e,
            data: p,
            methods: {
                bindChange: function(e) {
                    this.render(e.detail.value)
                },
                updateValue: c,
                render: function() {
                    var n = this,
                        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                        u = this.getComponentData().cols,
                        a = u[0].values[r[0]],
                        o = void 0,
                        c = !1;
                    if (a !== d.currentProvince) {
                        var l = i(a);
                        o = l[r[1]], u[1].values = l, d.currentProvince = a, d.currentCity = o, c = !0
                    }
                    var v = u[1].values[r[1]];
                    c || v === d.currentCity || (o = v, d.currentCity = o, p.currentCity = o),
                    function(r, u) {
                        var a, o = n.updateValue(r, u);
                        n.setData((a = {}, t(a, "$wux.pickerCity." + e + ".cols", r), t(a, "$wux.pickerCity." + e + ".value", o.valueIndex), t(a, "$wux.pickerCity." + e + ".currentProvince", d.currentProvince), t(a, "$wux.pickerCity." + e + ".currentCity", d.currentCity || i(d.currentProvince)[0]), a)), "function" == typeof p.onChange && p.onChange(o)
                    }(u, r), d.value = r, d.cols = u
                }
            }
        }).render(d && d.value || p.value)
    }
};