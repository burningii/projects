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
    i = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var i = e[n];
            "请选择" !== i.name && t.push(i.name)
        }
        return t.length ? t : [""]
    }, u = function(e) {
        return e.l2 ? i(e.l2) : [""]
    }, a = function(e) {
        for (var t = 0; t < l.length; t++) if (l[t].name === e) return u(l[t]);
        return [""]
    }, r = function(e) {
        var t = [];
        return l.forEach(function(n, i) {
            n.id == e[0] && (t[0] = i, n.l2.forEach(function(n, i) {
                n.id == e[1] && (t[1] = i)
            }))
        }), t
    }, o = function(e) {
        var t = [];
        return l.forEach(function(n, i) {
            e[0] == i && (t[0] = n.id, n.l2.forEach(function(n, i) {
                e[1] == i && (t[1] = n.id)
            }))
        }), t
    }, l = e(require("./data")).
default, c = l.map(function(e) {
    return e.name
}), s = c[0], v = u(l[0]), d = v[0];
exports.
default = {
    setDefaults: function() {
        return {
            title: "请选择",
            cols: [{
                values: c,
                className: "col-province"
            }, {
                values: v,
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
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, u = this,
            l = function() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = [], i = [], u = [], a = 0; a < e.length; a++) if (e[a]) {
                    var r = e[a].values || [],
                        l = e[a].displayValue || [],
                        c = t[a];
                    i.push(void 0 !== r[c] ? c : 0), n.push(void 0 !== r[c] ? r[c] : r[0]), u.push(void 0 !== l[c] ? l[c] : void 0)
                }
                return !(n.indexOf(void 0) >= 0) && {
                    text: n,
                    value: o(i),
                    valueIndex: i,
                    displayValue: u
                }
            }, c = u.temp[e] = u.temp[e] ? u.temp[e] : {
                currentProvince: s,
                currentCity: d
            }, v = Object.assign({}, this.setDefaults(), i);
        v.value = l(v.cols, r(v.value)).valueIndex, v.cols = c && c.cols || v.cols;
        var f = new n.
        default ({
            scope: "$wux.pickerCity." + e,
            data: v,
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
                updateValue: l,
                render: function() {
                    var n = this,
                        i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                        u = this.getComponentData().cols,
                        r = u[0].values[i[0]],
                        o = void 0,
                        l = !1;
                    if (r !== c.currentProvince) {
                        var s = a(r);
                        o = s[0], u[1].values = s, c.currentProvince = r, c.currentCity = o, l = !0
                    }
                    var d = u[1].values[i[1]];
                    l || d === c.currentCity || (o = d, c.currentCity = o),
                    function(i, u) {
                        var a, r = n.updateValue(i, u);
                        n.setData((a = {}, t(a, "$wux.pickerCity." + e + ".cols", i), t(a, "$wux.pickerCity." + e + ".value", r.valueIndex), a)), "function" == typeof v.onChange && v.onChange(r)
                    }(u, i), c.value = i, c.cols = u
                }
            }
        });
        f.show(), f.render(c && c.value || v.value)
    }
};