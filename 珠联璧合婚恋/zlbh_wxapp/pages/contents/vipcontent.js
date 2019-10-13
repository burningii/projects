! function(t) {
    t && t.__esModule
}(require("../../etc/config"));
var t = getApp(),
    a = require("../../wxParse/wxParse.js");
Page({
    data: {},
    onLoad: function() {
        this.$wuxToast = t.Wux().$wuxToast, this.productData = t.HttpResource("/productlist.html"), this.getData()
    },
    onShow: function() {},
    getData: function() {
        var t = this;
        this.productData.getAsync().then(function(e) {
            200 == e.code && (t.setData({
                pro: e.data
            }), a.wxParse("text1", "html", t.data.pro.instructions[0].contents, t, 5), a.wxParse("text2", "html", t.data.pro.instructions[1].contents, t, 5))
        })
    }
});