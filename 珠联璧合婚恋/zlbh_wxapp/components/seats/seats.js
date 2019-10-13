function e(e, t, s) {
    return t in e ? Object.defineProperty(e, t, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = s, e
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
        return {
            maps: [],
            max: 8,
            maxRowIndex: void 0,
            maxColumnIndex: void 0,
            onSelect: function(e) {}
        }
    },
    init: function(s) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = Object.assign({
            animateCss: void 0,
            visible: !1
        }, this.setDefaults(), a),
            i = new t.
        default ({
            scope: "$wux.seats." + s,
            data: n,
            methods: {
                hide: function() {
                    if (this.removed) return !1;
                    this.removed = !0, this.setHidden()
                },
                show: function() {
                    if (this.removed) return !1;
                    this.setVisible()
                },
                getData: function() {
                    for (var e = n.maps, t = n.maxColumnIndex, s = n.maxRowIndex, a = {
                        seats: [],
                        maps: []
                    }, i = 0; i < s; i++)! function(t) {
                        a.seats[t] = [], e.forEach(function(e, s) {
                            t + 1 === e.rowIndex && a.seats[t].push(e)
                        })
                    }(i);
                    return a.seats.forEach(function(e, s) {
                        a.maps[s] = [];
                        for (var n = 0; n < t; n++) {
                            for (var i = 0; i < e.length; i++) if (n + 1 === e[i].columnIndex) {
                                a.maps[s].push(Object.assign({
                                    space: !1
                                }, e[i]));
                                break
                            }
                            a.maps[s][n] || a.maps[s].push(Object.assign({
                                space: !0
                            }))
                        }
                    }), a
                },
                render: function() {
                    this.setData(e({}, "$wux.seats." + s + ".seats", this.getData().maps))
                },
                bindchange: function(t) {
                    var a = t.detail.value,
                        i = this.getComponentData().seats,
                        o = {
                            items: []
                        };
                    a.length > n.max && a.splice(n.max), i.forEach(function(e, t) {
                        e.forEach(function(e, t) {
                            e.checked = !1;
                            for (var s = 0; s < a.length; s++) if (e.id == a[s]) {
                                e.checked = !0, o.items.push(e);
                                break
                            }
                        })
                    }), this.setData(e({}, "$wux.seats." + s + ".seats", i)), "function" == typeof n.onSelect && n.onSelect.call(this, o.items)
                },
                disabled: function(t) {
                    var a = this.getComponentData().seats,
                        n = t.length;
                    a.forEach(function(e, s) {
                        e.forEach(function(e, s) {
                            for (var a = 0; a < n; a++) if (e.id == t[a]) {
                                e.disabled = !0;
                                break
                            }
                        })
                    }), this.setData(e({}, "$wux.seats." + s + ".seats", a))
                }
            }
        });
        return i.show(), i.render(), i
    }
};