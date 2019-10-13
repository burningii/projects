var t = getApp(),
    e = (require("../../utils/auth.js"), require("../../utils/WxNotificationCenter.js")),
    o = {
        tipText: ["昵称", "个人资料", "个人形象照", "兴趣爱好"],
        tipStatusText: ["未填写", "未通过审核"],
        tipUrl: ["/pages/u/edit/edit-info", "/pages/u/edit/edit-info", "", "/pages/u/edit/edit-enjoy"]
    };
const app = getApp()
import http from '../util/request.js';     
Page({
    data: {
        msgStatus: !1,
        showErrorBox: !1,
        showErrorText: [],
        showGuide: !1,
        logged: 0,
        userCheck: {
            basic_check: 1,
            is_introduce: 1,
            more_check: 1,
            want_check: 1,
            contact_check: 1
        },
        curpage: "my",
        showerr:1,
        avatar:"",
        ios: wx.getStorageSync("ios")
    },
    onLoad: function() {
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data, avatar: data.avatar});
      });
      http.get('config').then(data => {
        if (data.pian == "1") {
          wx.setNavigationBarTitle({
            title: '联系我们',
          })
          wx.redirectTo({
            url: '../user/company/index',
          });
          return false;
        }
        this.setData({ config: data });
      });

      this.$wuxActionSheet = t.Wux().$wuxActionSheet;
    },
    didNotification: function() {
        this.getUserInfoData()
    },
    onShow: function() {
      http.get('config').then(data => {
        if (data.pian == "1") {
          wx.setNavigationBarTitle({
            title: '联系我们',
          })
          wx.redirectTo({
            url: '../user/company/index',
          });
          return false;
        }
        this.setData({ config: data });
      });

    },
    linkTip: function() {
      if (this.data.user.percent == 10){
        wx.navigateTo({
          url: '../register/msglogin',
        })
      }else{
        this.setData({ showerr: 0 });
      } 
    },
    getUserInfoData: function() {
        var e = this;
        t.HttpResource("member/getBasicProfile.html").saveAsync().then(function(a) {
            if (a.code = 200) 0 == a.data.userinfo.nickname_status ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[0], o.tipStatusText[0], o.tipUrl[0]]) : 3 == a.data.userinfo.nickname_status ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[0], o.tipStatusText[1], o.tipUrl[0]]) : 0 == a.data.userinfo.ischeck ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[1], o.tipStatusText[0], o.tipUrl[1]]) : 3 == a.data.userinfo.ischeck ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[1], o.tipStatusText[1], o.tipUrl[1]]) : 0 == a.data.userinfo.avatarStatus ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[2], o.tipStatusText[0], o.tipUrl[2]]) : 3 == a.data.userinfo.avatarStatus ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[2], o.tipStatusText[1], o.tipUrl[2]]) : 0 == a.data.userinfo.f_status ? (e.data.showErrorBox = !0, e.data.showErrorText = [o.tipText[3], o.tipStatusText[0], o.tipUrl[3]]) : e.data.showErrorBox = !1, a.data.userinfo.viewme.length > 0 && (a.data.userinfo.viewme = a.data.userinfo.viewme.slice(0, 5)), e.setData({
                userinfo: a.data.userinfo,
                showErrorBox: e.data.showErrorBox,
                showErrorText: e.data.showErrorText,
                ios_pay: a.data.ios_pay
            });
            else if (300 == a.code) return t.WxService.showModal({
                content: "未知错误，请重新登录！",
                showCancel: !1
            }).then(function() {
                return t.WxService.removeStorageSync("loginSession")
            }, t.WxService.removeStorageSync("us"), t.WxService.navigateTo("/pages/buy/payment"))
        })
    },
    getPayment: function() {
        t.WxService.navigateTo("/pages/buy/payment")
    },
    logout: function() {
        var e = this;
        t.WxService.showModal({
            title: "友情提示",
            content: "确定要登出吗？"
        }).then(function(t) {
            return 1 == t.confirm && e.signOut()
        })
    },
    signOut: function() {
        t.WxService.removeStorageSync("us"), t.WxService.redirectTo("/pages/index/index")
    },
    chooseImage: function(t) {
        var e = ["album", "camera"];
        t && (e = [t]), wx.chooseImage({
            sizeType: ["original", "compressed"],
            sourceType: e,
            count: 1,
            success: function(t) {
                var e = t.tempFilePaths[0];
                console.log(e), wx.navigateTo({
                    url: "/pages/userphoto/upload/upload?src=" + e
                })
            }
        })
    },
    pageClose: function() {
        this.setData({
            showGuide: !1
        })
    },
    closeTip: function() {
        this.setData({
            showErrorBox: !1
        })
    },
    uploadAvatar: function() {
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
                t.setData({ avatar: url });
                http.get('setavatar',{url:url,uid:t.data.user.id});
                wx.hideToast();
              },
            })
          },
        })
    },
    onUnload: function() {
        e.removeNotification("UserNotification")
    },
    getLogUrl: function(e) {
        t.HttpService.wechatSetFormid({
            siteid: wx.getStorageSync("siteid"),
            formId: e.detail.formId
        }), wx.reLaunch({
            url: e.target.dataset.url
        })
    },
    showKefuEvent: function() {
        this.setData({
            showKefuStatus: !0
        })
    },
    hideKefuEvent: function() {
        this.setData({
            showKefuStatus: !1
        })
    },
    getViewmeUrl: function() {
        t.WxService.navigateTo("/pages/u/info/view")
    },
    getIospay: function() {
        if ("ios" == t.WxService.getStorageSync("systemInfo").platform && 1 == this.data.ios_pay) return t.WxService.showModal({
            content: "小程序暂不支持充值！",
            showCancel: !1
        });
        t.WxService.navigateTo("/pages/buy/payment")
    },
    shower: function () {
      var current = this.data.config.url + this.data.config.gzh;
      wx.previewImage({
        current: current,
        urls: [current]
      })
    }
});