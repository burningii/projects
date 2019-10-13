var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t
};
module.exports = {
    formatDate: function(t) {
        if (0 == t) return "";
        var e, n = t,
            r = (e = (new Date).getTime() / 1e3) - n,
            u = new Date(1e3 * n),
            a = new Date(1e3 * e),
            g = "";
        return r > 604800 ? (g = u.getFullYear() + "-" + (u.getMonth() + 1) + "-" + u.getDate() + " ", g += u.getHours() + ":" + (u.getMinutes() > 9 ? u.getMinutes() : "0" + u.getMinutes())) : g = r > 172800 ? Math.round(r / 86400) + "天前" : r > 86400 ? "昨天" + u.getHours() + ":" + (u.getMinutes() > 9 ? u.getMinutes() : "0" + u.getMinutes()) : r > 3600 ? u.getDate() == a.getDate() ? Math.round(r / 3600) + "小时前" : "昨天" + u.getHours() + ":" + (u.getMinutes() > 9 ? u.getMinutes() : "0" + u.getMinutes()) : r > 60 ? Math.round(r / 60) + "分钟前" : "刚刚", g
    },
    heightConvert: function(t, e) {
        return 0 != t && 0 != e ? t + "-" + e + "厘米" : 0 != t ? t + "厘米以上" : 0 != e ? e + "厘米以下" : "不限"
    },
    ageConvert: function(t, e) {
        return 0 != t && 0 != e ? t + "-" + e + "岁" : 0 != t ? t + "岁以上" : 0 != e ? e + "岁以下" : "不限"
    },
    alert: function(t) {
        var e = this;
        e.setData({
            warning: !0,
            warnDes: t
        }), setTimeout(function() {
            e.setData({
                warning: !1
            })
        }, 1e3)
    },
    formatTime: function(e) {
        var n = e.getFullYear(),
            r = e.getMonth() + 1,
            u = e.getDate(),
            a = e.getHours(),
            g = e.getMinutes(),
            i = e.getSeconds();
        return [n, r, u].map(t).join("/") + " " + [a, g, i].map(t).join(":")
    }
};