! function(t) {
    t && t.__esModule
}(require("../../etc/config"));
var t = getApp(),
    a = require("../../wxParse/wxParse.js");
const app = getApp()
import http from '../util/request.js';      
Page({
    data: {},
    onLoad: function() {
        this.$wuxToast = t.Wux().$wuxToast;
        var that = this;
        http.get('config').then(data => {
          this.setData({ config: data });
          a.wxParse('article', 'html', data.about, that, 5);
        });
    },
    onShow: function() {},
    getData: function() {
        var t = this;
        this.contractData.getAsync().then(function(e) {
            200 == e.code && (t.setData({
                coin: e.data
            }), a.wxParse("text1", "html", t.data.coin.contract, t, 5))
        })
    }
});