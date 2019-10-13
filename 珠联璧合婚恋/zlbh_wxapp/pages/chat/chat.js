import http from '../util/request.js';    
var t = getApp(),
    a = wx.getSystemInfoSync();
Page({
    data: {    
        uid: 0,
        card_id: 0,
        t_uid: 0,
        t_card_id: 0,
        t_card_info: !1,
        msgList: [],
        msgContent: "",
        last_time: 0,
        fetchInterval: 0,
        pageHeight: a.windowHeight,
        first_time: "",
        prevPage: !1
    },
    pageScrollToBottom: function() {
        var t = 999 * this.data.msgList.length;
        console.log(t), this.setData({
            scrollTopVal: t
        })
    },
    
    onLoad: function(a) {
      var t = this, e = a.cid || 17;
      t.setData({
        card_id: e
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      http.get('user', { uid: e }).then(data => {
        this.setData({ card: data});
        wx.setNavigationBarTitle({
          title: '与'+data.nickname+'聊天',
        })
        http.get('msgList', { c_uid: e, t_uid:wx.getStorageSync("user").id}).then(data => {
          this.setData({ msgList: data });
        });
      });
    },
    fetchMsgList: function() {
        var a = this;
        a.data.fetchInterval = setInterval(function() {
            wx.request({
                url: t.util.url("entry/wxapp/getChatMsg"),
                method: "get",
                data: {
                    card_id: a.data.card_id,
                    t_card_id: a.data.t_card_id,
                    t_uid: a.data.t_uid,
                    last_time: a.data.last_time
                },
                success: function(t) {
                    var e = t.data.data;
                    e.length > 0 && (a.data.msgList = a.data.msgList.concat(e), a.setData({
                        msgList: a.data.msgList
                    }, function() {
                        a.pageScrollToBottom()
                    }), a.data.last_time = a.data.msgList[a.data.msgList.length - 1].create_time, a.data.prevPage && (a.data.prevPage.data.isFresh = !0))
                }
            })
        }, 3e3)
    },
    setMsgContent: function(t) {
        this.data.msgContent = t.detail.value
    },
    sendMsg: function() {
        var a = this;
        console.log(a.data.msgContent);
        if (a.data.msgContent == ""){
          wx.showToast({
            title: '内容不能为空!',
            duration:2500,
            icon:"none"
          })
          return false;
        }
        var d = {
          t_uid: wx.getStorageSync("user").id,
          c_uid: a.data.card_id,
          cid: 0,
          msg: a.data.msgContent,
        };
        http.post('sendmsg', d).then(data => {
          wx.showToast({
            title: '发送成功',
            duration: 2500,
          })
          http.get('msgList', { c_uid: a.data.card_id, t_uid: wx.getStorageSync("user").id }).then(data => {
            a.setData({ msgList: data, msgContent:""});
          });
        });
    },
    toCardPage: function() {
        wx.navigateBack({
            delta: 1
        })
    },
    viewPosition: function() {
      
      wx.openLocation({
        latitude: parseFloat(this.data.card.lat),
        longitude: parseFloat(this.data.card.lng),
        address: this.data.card.address,
        name: this.data.card.user_gongsi
      });
    },
    callPhone: function() {
        wx.makePhoneCall({
          phoneNumber: this.data.card.user_true_phone
        })
    },
    downLoadImg: function (t, e) {
      wx.getImageInfo({
        src: t,
        success: function (t) {
          wx.setStorage({
            key: e,
            data: t
          }), console.log("成功");
        }
      });
    },
    saveCardQr: function() {
        var e = this;
        wx.showLoading({
          title: "生成图片中",
          mask: !0
        });
        var o = wx.createCanvasContext("shareCanvas", this);
        o.drawImage("/assets/share_tpl2@2x.png", 0, 0, 414, 736);
        console.log(e.data.card_info.user_header_img);
        console.log(e.data.config.url + e.data.config.wxapp_code);
        this.downLoadImg(e.data.card_info.user_header_img, 'img1');
        this.downLoadImg(e.data.config.url + e.data.config.wxapp_code, 'img2');
        //封面图片 分享
        o.drawImage(wx.getStorageSync("img1").path, 0, 0, 414, 276);
        o.drawImage("/assets/box@2x.png", 0, 174, 414, 562);
        //小程序二维码
        o.drawImage(wx.getStorageSync("img2").path, 167, 618, 83, 83);
        console.log(111111);
        var l = 1,
          r = e.data.card_info.user_gongsi,
          d = e.data.card_info.address,
          u = e.data.card_info.user_true_phone,
          sh = e.data.card_info.user_true_name || "",
          h = e.data.card_info.user_zhiwu;
        var st = e.data.card_info.user_email;
        //处理分享内容文字
        var c = e.data.card_info.user_jianjie;
        var a = 15,
          e = 22,
          i = c.split("\r\n"),
          n = 0;
        i.length > 3 && (i = i.slice(0, 3));
        console.log(222222);
        for (var s in i) for (var l = i[s], g = parseInt(l.length / a) + 1, p = 0; p < g; p++)! function (t, i) {
          if (2 === i && t.length === a) t = t.slice(0, 13) + "..";
          else if (i > 2) return;
          var n = 450 + 35 * i;
          console.log("[draw]", t, n), o.setFontSize(20), o.setTextAlign("center"), o.setFillStyle("#333333");
          for (var s in t) {
            var l = t[s];
            o.fillText(l, 50 + s * e, n)
          }
        }(l.slice(p * a, (p + 1) * a), n), n++;

        console.log("sss");
        o.setFontSize(14), o.setTextAlign("center"), o.setFillStyle("#888888"), o.fillText(h + " " + sh + " | " + u + " | " + st, 207, 260), o.setFontSize(14), o.setTextAlign("center"), o.setFillStyle("#999999"), o.fillText(d, 207, 590);
        //var f = r.split("-");
        o.setFontSize(18), o.setTextAlign("center"), o.setFillStyle("#666666"), o.fillText(r, 207, 350), o.setFontSize(18), o.setTextAlign("center"), o.setFillStyle("#999999"), o.stroke();
        //console.log(f);
        wx.hideLoading(), o.draw(false, function () {
          wx.canvasToTempFilePath({
            canvasId: "shareCanvas",
            x: 0,
            y: 0,
            width: 414,
            height: 736,
            success: function (t) {
              var a = [t.tempFilePath];
              wx.previewImage({
                urls: a
              })
            }
          })

        });
    },
    addWxFriend: function() {
        wx.setClipboardData({
            data: this.data.card.wx,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功"
                        })
                    }
                })
            }
        })
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        
    },
    onHide: function() {},
    onUnload: function() {
        clearInterval(this.data.fetchInterval)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});