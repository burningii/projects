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
    init: function() {
        var t = {
            animateCss: void 0,
            visible: !1
        };
        return new e.
        default ({
            scope: "$wux.backdrop",
            data: t,
            methods: {
                retain: function() {
                    "number" == typeof this.backdropHolds && this.backdropHolds || (this.backdropHolds = 0), 1 === ++this.backdropHolds && this.setVisible()
                },
                release: function() {
                    1 === this.backdropHolds && this.setHidden(), this.backdropHolds = Math.max(0, this.backdropHolds - 1)
                }
            }
        })
    }
};