! function(t) {
    t && t.__esModule 
}(require("../../../etc/config"));
var t = getApp();
require("../../../utils/util.js");
const app = getApp()
import http from '../../util/request.js';
Page({
    data: {},
    onLoad: function(e) {
        this.$wuxToast = t.Wux().$wuxToast;
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data, avatar: data.avatar });
        });
        http.get('config').then(data => {
          this.setData({ config: data });
        });
    },
    onShow: function() {
        this.renderForm()
    },
    renderForm: function() {
        var t = this;
    },
    showToastSuc: function(t, e) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return e
            }
        })
    },
    showToastErr: function(t, e) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return e
            }
        })
    },
    showToastCancel: function(t, e) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return e
            }
        })
    },
    resubmit: function() {
        t.WxService.navigateTo("/pages/u/verify/step1")
    }
});