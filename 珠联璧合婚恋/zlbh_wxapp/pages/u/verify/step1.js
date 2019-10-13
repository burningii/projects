function e(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
function t() {
    var e = {
        region: "" + o.
        default.qiniu,
        uptokenURL: o.
        default.basePath + "/qiniu.html?siteid=" + o.
        default.siteid,
        domain: "" + o.
        default.qnimgUrl,
        shouldUseQiniuFileName: !1
    };
    n.
    default.init(e)
}
var i = e(require("../../../helpers/WxValidate")),
    n = e(require("../../../utils/qiniuUploader")),
    o = e(require("../../../etc/config")),
    a = getApp(),
    s = (require("../../../utils/util.js"), require("../../../wxParse/wxParse.js"));
const app = getApp()
import http from '../../util/request.js';   
Page({
    data: {
        bg: a.globalData.bgurl,
        kefuTel: o.
        default.kefuTel,
        mobile: {
            oldnumber: "",
            number: "",
            phone_verify_status: !1,
            phone_verify_expiry_time: 60,
            phone_verify_text: "获取验证码"
        },
        form: {
            file: null
        },
        verify_photo:null,
    },
    onLoad: function(e) {
      var that = this;
      this.$wuxToast = a.Wux().$wuxToast;
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data, avatar: data.avatar });
        this.setData({ verify_photo: data.verify_photo });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
        s.wxParse('article', 'html', data.zhuyishix, that, 5);
        s.wxParse('article1', 'html', data.zhaopian, that, 5);
        
      });
    },
    onShow: function() {
        this.renderForm()
    },
    getTel: function() {
        var e = this;
        this.tel.getAsync().then(function(t) {
            200 == t.code && e.setData({
                kefuTel: t.data
            })
        })
    },
    renderForm: function() {
        var e = this;
      
    },
    chooseImage: function(e) {
        var t = this;
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
                var url = JSON.parse(res.data).url;
                t.setData({ verify_photo: url });
                wx.hideToast();
              },
            })
          },
        })
    },
    uploadDIY: function(e) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        t(), n.
        default.upload(e, function(e) {
            i(e.imageURL)
        })
    },
    submitForm: function(e) {
        var t = this,
            i = this,
            n = e.detail.value;
        if (n.uname == ""){
          wx.showToast({
            title: '请输入真实姓名',
            duration:1500,
            icon:"none"
          });
          return false;
        }
        if (n.cert == "") {
          wx.showToast({
            title: '身份证号不能为空',
            duration: 1500,
            icon: "none" 
          });
          return false;
        }
        if (t.data.verify_photo == null){
          wx.showToast({
            title: '认证照片不能为空',
            duration: 1500,
            icon: "none"
          });
          return false;
        }
        n.verify_photo = t.data.verify_photo;
        n.uid = wx.getStorageSync("user").id;
        http.post('veripost',n).then(data => {
          wx.navigateTo({
            url: './step2',
          })
        });
    },
    bindOldMobile: function(e) {
        this.setData({
            "mobile.oldnumber": e.detail.value
        })
    },
    bindMobile: function(e) {
        this.setData({
            "mobile.number": e.detail.value
        })
    },
    showToastSuc: function(e, t) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    showToastErr: function(e, t) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    showToastCancel: function(e, t) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + e,
            success: function() {
                return t
            }
        })
    },
    onTel: function() {
        var e = this;
        a.WxService.showModal({
            title: "拨打电话",
            content: "是否给客服拨打电话"
        }).then(function(t) {
            return 1 == t.confirm && wx.makePhoneCall({
                phoneNumber: e.data.kefuTel || "0728-3319567"
            })
        })
    }
});