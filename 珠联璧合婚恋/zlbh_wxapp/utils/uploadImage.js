function o() {
    var o = {
        region: "SCN",
        uptokenURL: n.globalData.apiUrl + "/upload_token",
        uptoken: l,
        domain: "http://school.bkt.clouddn.com",
        shouldUseQiniuFileName: !1
    };
    e.init(o)
}
var n = getApp(),
    e = require("qiniuUploader.js"),
    l = "";
n.getUploadToken(function(o) {
    l = o
}), module.exports = {
    upload: function(n) {
        var l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        o();
        var t = n;
        e.upload(t, function(o) {
            var n = o.key;
            console.log(n), l(o.key)
        })
    }
};