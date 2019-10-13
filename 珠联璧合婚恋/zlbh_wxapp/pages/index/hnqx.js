! function(t) {
    t && t.__esModule
}(require("../../etc/config"));
var t = getApp();
import http from '../util/request.js'; 
Page({
    data: {
      bg: t.globalData.bgurl,
    },
    onLoad: function(n) {
       this.$wuxToast = t.Wux().$wuxToast;
       http.get('config').then(data => {
         this.setData({ config: data});
       });
    },
    getinfo: function() {
        var t = this;
        this.hnqx.getAsync().then(function(n) {
            (n.code = 200) && t.setData({
                info: n.data
            })
        })
    },
    copyWechat: function() {
        var n = this.data.config.wechatNum,
            o = this;
        n ? wx.setClipboardData({
            data: n,
            success: function(n) {
                t.WxService.showModal({
                    content: "复制红娘微信号成功",
                    showCancel: !1
                })
            },
            fail: function() {
                o.copyErr()
            }
        }) : o.copyErr()
    },
    copyErr: function() {
        var n = this;
        t.WxService.showModal({
            content: "复制失败，请稍后重试或联系红娘客服",
            showCancel: !1
        }).then(function(t) {
            return 1 == t.confirm && n.getinfo()
        })
    },
    showToastSuc: function(t, n) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return n
            }
        })
    }
});