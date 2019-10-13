function t(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}
function e() {
    var t = {
        region: "" + i.
        default.qiniu,
        uptokenURL: i.
        default.basePath + "/qiniu.html?siteid=" + i.
        default.siteid,
        domain: "" + i.
        default.qnimgUrl,
        shouldUseQiniuFileName: !1
    };
    a.
    default.init(t)
}
const app = getApp()
import http from '../../util/request.js'; 
var a = t(require("../../../utils/qiniuUploader")),
    i = t(require("../../../etc/config")),
    o = getApp(),
    s = require("../../../utils/WxNotificationCenter.js");
Page({
    data: {
        files: [],
        maxImageNum: 15
    },
    onLoad: function() {
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.getData();
        this.setData({ user: data, files: data.photolist ? data.photolist  : []});
      });
      this.$wuxToast = o.Wux().$wuxToast.$wuxToast
    },
    onShow: function() {},
    getData: function() {
        var t = this;
       
    },
    getPayment: function() {
        o.WxService.navigateTo("/pages/buy/payment")
    },
    chooseImage: function(t) {
        var e = this;
        var t = this;
        if ((this.data.user.vip == 0 || this.data.user.vip1 == 1) && (e.data.files.length < e.data.maxImageNum)){
            /*
            wx.showToast({
              title: "最多只能上传" + e.data.maxImageNum + "张图，开通会员无限制上传",
              duration:2500,
              icon:"none"
            })
            return false;
           */
        }
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        });
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            var tempFilePaths = res.tempFilePaths;
            let siteroot = app.siteInfo.siteroot;
            siteroot = siteroot.replace('app/index.php', 'web/index.php');
            let upurl = siteroot + '?i=' + app.siteInfo.uniacid + '&c=utility&a=file&do=upload&thumb=0';
            wx.uploadFile({
              url: upurl,
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {},
              header: {},
              success: function (res) {
                //console.log(JSON.parse(res.data).url);return false;
                var url = JSON.parse(res.data).url;
                console.log(url);
                t.setData({
                  files: t.data.files.concat(url)
                })
                http.get('setimgs', { imgs: t.data.files.join(','),uid:wx.getStorageSync("user").id}).then(data => {

                });
                wx.hideToast();
              },
            })
          },
        })
    
    },
    uploadDIY: function(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        e(), a.
        default.upload(t, function(t) {
            i(t.imageURL)
        })
    },
    deleteImage: function(t) {
        var e = t.currentTarget.id,
            a = this;
         
        o.WxService.showModal({
            title: "提示",
            content: "确定要删除该图片？"
        }).then(function(t) {
            1 == t.confirm && (a.data.files = a.data.files.filter(function(t,i) {
                return !(i == e)
            }), console.log(a.data.files), a.setData({
                files: a.data.files
              }), http.get('setimgs', { imgs: a.data.files.join(','), uid: wx.getStorageSync("user").id }).then(data => { }))
        });
        
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
    onUnload: function() {
        s.postNotificationName("UserNotification")
    }
});