function o(o) {
    e.push(o)
}
"function" == typeof Symbol && Symbol.iterator;
var e = [];
module.exports = {
    addNotification: function(e, n, t) {
        e && n ? (t || console.log("addNotification Warning: no observer will can't remove notice"), o({
            name: e,
            selector: n,
            observer: t
        })) : console.log("addNotification error: no selector or name")
    },
    removeNotification: function(o, n) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            if (i.name === o && i.observer === n) return void e.splice(t, 1)
        }
    },
    postNotificationName: function(o, n) {
        if (0 != e.length) for (var t = 0; t < e.length; t++) {
            var i = e[t];
            i.name === o && i.selector(n)
        } else console.log("postNotificationName error: u hadn't add any notice.")
    }
};