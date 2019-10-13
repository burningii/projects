Object.defineProperty(exports, "__esModule", {
    value: !0
});
var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}(require("../component"));
exports.
default = {
    setDefaults: function() {
        return {
            text: "数据加载中"
        }
    },
    show: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = Object.assign({}, this.setDefaults(), t);
        this.component = new e.
        default ({
            scope: "$wux.loading",
            data: n,
            methods: {
                hide: function() {
                    if (this.removed) return !1;
                    this.removed = !0, this.setHidden()
                },
                show: function() {
                    if (this.removed) return !1;
                    this.setVisible()
                }
            }
        }), this.component.show()
    },
    hide: function() {
        this.component && this.component.hide()
    }
};