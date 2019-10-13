function e(e) {
    return e && e.__esModule ? e : {
        default: e 
    };
}
const app = getApp()
import http from '../../util/request.js';
var WxParse = require('../../../wxParse/wxParse.js');
Page({
    data: {},
    onLoad: function(e) {
       var that = this;
        http.get('config').then(data => {
          this.setData({ config: data });
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: data.color,
          });
          WxParse.wxParse('content', 'html', data.content, that, 5);
        });
        http.get('focus',{tid:0}).then(data => {
          this.setData({ picdata: data });
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        /*
        t.default.get(n.duoguan_host_api_url + "/index.php?s=/addon/DuoguanUser/Api/getCompany.html", {}, function(t) {
            t.isLoaded = !0, e.setData(t), a.default.wxParse("content", "html", t.content, e);
        }, this, {
            completeAfter: wx.stopPullDownRefresh
        });
        */
    },
    onCallPhoneTap: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.config.tel
        });
    },
    onCopyTap: function(e) {
        var t = e.currentTarget.dataset.value;
        wx.setClipboardData({
            data: t,
            success: function(e) {
                wx.showToast({
                    title: "复制成功！"
                });
            }
        });
    },
    onUnload:function(){
      wx.redirectTo({
        url: '../user/company/index',
      });
    },
    onShareAppMessage: function() {}
});