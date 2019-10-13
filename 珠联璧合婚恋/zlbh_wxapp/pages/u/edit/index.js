var e = getApp(),
    t = (require("../../../utils/auth.js"), require("../../../utils/WxNotificationCenter.js")),
    i = wx.createInnerAudioContext(),
    a = void 0,
    o = void 0; 
const app = getApp()
import http from '../../util/request.js';    
Page({ 
    data: {
        logged: 0,
        sexDataType: ["", "他", "她"],
        is_collect: !1,
        showModalStatus: [!1, !1],
        showMemberContact: !1,
        voice_type: "播放",
        voice__times: "00",
        bg: e.globalData.bgurl,
    },
    onLoad: function(i) {
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        console.log(data);
        this.setData({ user: data, avatar: data.avatar, voice_times: data.voice_times});
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
    }, 
    onShow: function() {
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        console.log(data);
        this.setData({ user: data, avatar: data.avatar, voice_times: data.voice_times });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
    },
    didNotification: function() {},
    renderForm: function() {
        var e = this;
        
    },
    onEditenjoy: function() {
      e.WxService.navigateTo("/pages/u/edit/xq")
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
                http.get('setavatar', { url: url, uid: t.data.user.id });
                wx.hideToast();
              },
            })
          },
        })
    },
    chooseImage: function(e) {
        var t = ["album", "camera"];
        e && (t = [e]), wx.chooseImage({
            sizeType: ["original", "compressed"],
            sourceType: t,
            count: 1,
            success: function(e) {
                var t = e.tempFilePaths[0];
                wx.navigateTo({
                    url: "/pages/userphoto/upload/upload?src=" + t
                })
            }
        })
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.user.nickname + "的相亲资料",
            path: "/pages/index/member?id=" + this.data.user.id
        }
    },
    voicePlay: function() {
        var e = this,
            t = "00";
        t = e.data.user.voice_times < 10 ? "0" + e.data.user.voice_times : e.data.user.voice_times, "播放" == this.data.voice_type ? (i.src = this.data.user.voice_path, i.autoplay = !0, o = this.data.user.voice_times, e.setData({
            voice_type: "停止"
        }), a = setInterval(function() {
            o--, e.data.user.voice_times = o < 10 ? "0" + o : o, e.setData({
              "personal.voice_times": e.data.user.voice_times
            }), o < 0 && (clearInterval(a), i.stop(), e.setData({
                voice_type: "播放",
                "user.voice_times": t
            }))
        }, 1e3)) : "停止" == e.data.voice_type && (clearInterval(a), i.stop(), e.setData({
            voice_type: "播放",
            "user.voice_times": t
        }))
    },
    onHide: function() {
        i.stop(), t.removeNotification("userinfoNotification")
    },
    onUnload: function() {
        i.stop(), t.removeNotification("userinfoNotification")
    }
});