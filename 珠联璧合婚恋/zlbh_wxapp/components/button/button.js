function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t
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
            className: void 0,
            position: "bottomRight",
            opened: !1,
            backdrop: 1,
            buttons: [],
            buttonClicked: function() {},
            callback: function() {},
            menuText: "快捷\n导航"
        }
    },
    data: function() {
        return [{
            type: "topLeft",
            className: "speed-dial-top-left"
        }, {
            type: "topRight",
            className: "speed-dial-top-right"
        }, {
            type: "bottomLeft",
            className: "speed-dial-bottom-left"
        }, {
            type: "bottomRight",
            className: "speed-dial-bottom-right"
        }]
    },
    init: function(n) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = Object.assign({
            animateCss: void 0,
            visible: !1
        }, this.setDefaults(), o);
        this.data().forEach(function(t, e) {
            t.type === i.position && (i.className = i.className ? t.className + " " + i.className : t.className)
        });
        var s = function(e) {
            var o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            e.setData(t({}, "$wux.button." + n + ".opened", o)), "function" == typeof i.callback && i.callback(e, o)
        }, a = new e.
        default ({
            scope: "$wux.button." + n,
            data: i,
            methods: {
                hide: function() {
                    if (this.removed) return !1;
                    this.removed = !0, this.setHidden()
                },
                show: function() {
                    if (this.removed) return !1;
                    this.setVisible()
                },
                close: function() {
                    if (!this.opened) return !1;
                    this.opened = !1, s(this, !1)
                },
                open: function() {
                    if (this.opened) return !1;
                    this.opened = !0, s(this, !0)
                },
                buttonClicked: function(t) {
                    var e = t.currentTarget.dataset.index;
                    !0 === i.buttonClicked(e, i.buttons[e]) && this.close()
                },
                toggle: function(t) {
                    this.opened ? this.close() : this.open()
                }
            }
        });
        return a.show(), a
    }
};