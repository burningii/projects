function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t
}
var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, a = getApp(), 
    i = require("../../utils/auth.js"),
    o = require("../../utils/WxNotificationCenter.js"),
    n = wx.createInnerAudioContext(),
    i = wx.createInnerAudioContext(),
    s = void 0,
    r = void 0;
import http from '../util/request.js'; 
Page({ 
    data: {
        interval: 0,
        indicatorDots: !0,
        indicatorColor: "rgba(255, 255, 255, .2)",
        indicatorActiveColor: "rgba(255, 255, 255, .6)",
        vertical: !1,
        autoplay: !1,
        voice_type: "播放",
        zanEvent: !1,
        logged: 0,
        sexDataType: ["", "他", "她"],
        is_collect: !1,
        showModalStatus: [!1, !1, !1],
        showMemberContact: 0,
        sp1:0,
        sp2:0,
        visible:1,
        muid:wx.getStorageSync("user").id,
        ios: wx.getStorageSync("ios")
    },
    onLoad: function(t) {
      this.$wuxToast = a.Wux().$wuxToast, this.$wuxButton = a.Wux().$wuxButton, this.id = t.id || 6;
      /*
        this.$wuxToast = a.Wux().$wuxToast, this.$wuxButton = a.Wux().$wuxButton, this.id = t.id, this.quality = a.HttpResource("/getObjectProfile.html"), this.follow = a.HttpResource("member/onfollow.html"), this.collect = a.HttpResource("member/oncollect.html"), this.hlqx = a.HttpResource("member/onhlqx.html"), this.share = a.HttpResource("/get_share_info.html"), this.usekey = a.HttpResource("member/usekey.html"), this.userAuthorization(), o.addNotification("DecryptNotification", this.didNotification, this), o.addNotification("GiftNotification", this.gifEventNotification, this), o.addNotification("userinfoNotification", this.userinfoNotification, this)
        */
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      http.get('user', { uid: this.id ,muid:wx.getStorageSync("user").id}).then(data => {
        this.setData({ user: data, voice_times: data.voice_times});
      });
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ muser: data });
      });   
    },
    backhome: function() {
        getCurrentPages().length >= 2 ? wx.navigateBack() : wx.redirectTo({
            url: "/pages/index/index"
        })
    },
    intervalChange: function(t) {
        this.setData({
            interval: t.detail.current
        })
    },
    userinfoNotification: function() {
        this.getData(), this.setData({
            us: a.WxService.getStorageSync("us")
        }), this.initButton()
    },
    gifEventNotification: function() {
        this.getData(), this.setData({
            us: a.WxService.getStorageSync("us")
        }), this.initButton()
    },
    didNotification: function() {
        this.userAuthorization()
    },
    userAuthorization: function() {
        a.WxService.getStorageSync("loginSession") ? "object" == e(a.WxService.getStorageSync("loginSession")) ? (a.WxService.removeStorageSync("loginSession"), i.authorization()) : (this.getData(), this.setData({
            us: a.WxService.getStorageSync("us")
        }), this.initButton()) : a.WxService.navigateTo("/pages/decrypt/index")
    },
    onShow: function() {
        var t = this;
        /*
        this.share.getAsync().then(function(e) {
            t.setData({
                share: e.data
            })
        })
        */
    },
    maskHideFilter: function(t) {
        var e = t.currentTarget.dataset.status;
        this.data.showModalStatus[e] = !1, this.setData({
            showModalStatus: this.data.showModalStatus,
            animateCss: "weui-animate-fade-out"
        })
    },
    getData: function() {
        var t = this,
            e = this;
        this.quality.getAsync({
            id: e.id
        }).then(function(e) {
            if (e.code = 200) e.data.photolist = e.data.thumb.slice(0, 5), e.data.voice_time = e.data.mp3time, e.data.voice_src = e.data.mp3, e.data.voice_time < 10 ? e.data.voice_times = "0" + e.data.voice_time : e.data.voice_times = e.data.voice_time, 0 == e.data.avatarURL ? 1 == e.data.gender ? e.data.avatar = "http://wx-img.jhrx.cn/love/20180801/sv_cover_default_male.png" : e.data.avatar = "http://wx-img.jhrx.cn/love/20180801/sv_cover_default_female.png" : e.data.avatar = e.data.avatarURL, e.data.thumblist = [e.data.avatar].concat(e.data.photolist), t.setData({
                logged: 1,
                personal: e.data
            }), 1 == e.data.userinfo.is_imkey && 1 == e.data.userinfo.is_card && 1 == e.data.public && null != e.data.contact ? t.setData({
                showMemberContact: 1
            }) : t.setData({
                showMemberContact: !1
            });
            else if (300 == e.code) return a.WxService.showModal({
                content: "未知错误，请重新登录！",
                showCancel: !1
            }).then(function() {
                return a.WxService.removeStorageSync("loginSession")
            }, a.WxService.removeStorageSync("us"), a.WxService.reLaunch("/pages/start/index"))
        })
    },
    getGift: function() {
      wx.navigateTo({
        url: '../gift/list?muid=' + this.data.user.id + "&nickname=" + this.data.user.nickname,
      })
    },
    contact:function(){
      wx.navigateTo({
        url: '../chat/chat?cid=' + this.data.user.id,
      })
    },
    getMsg: function() {
        console.log(this.data.showModalStatus);
        var t = this.data.personal;
        if (a.WxService.getStorageSync("us")) {
            if (this.data.us.uid == t.memberID) return a.WxService.showModal({
                content: "自己无法跟自己发消息",
                showCancel: !1
            });
            1 == t.userinfo.is_imkey ? a.WxService.navigateTo("/pages/im/imver", {
                id: t.memberID
            }) : (this.data.showModalStatus[0] = !0, this.setData({
                showModalStatus: this.data.showModalStatus
            }))
        } else this.getLogin()
    },
    getMessage: function(t) {
        var e = this.data.muser;
        if (0 == e.imkey) return a.WxService.showModal({
          content: "剩余沟通次数不足，充值购买次数！",
          showCancel: !1
        }).then(function () {
          return a.WxService.navigateTo("/pages/buy/imkeyment")
        });
        http.get('setyaoshi', { uid: this.data.user.id, muid: this.data.muser.id}).then(data => {
          this.setData({ sp1: 0, showMemberContact : 1});
          http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
            this.setData({ muser: data });
          }); 
        });
        /*
        if (a.WxService.getStorageSync("us")) {
            if (this.data.us.uid == e.memberID) return a.WxService.showModal({
                content: "自己无法跟自己发消息",
                showCancel: !1
            });
            if (0 == e.userinfo.is_imkey && 0 == e.userinfo.imkey) return a.WxService.showModal({
                content: "剩余沟通次数不足，充值购买次数！",
                showCancel: !1
            }).then(function() {
                return a.WxService.navigateTo("/pages/buy/payment")
            });
            this.data.showModalStatus[0] = !1, this.setData({
                showModalStatus: this.data.showModalStatus
            }), a.WxService.navigateTo("/pages/im/imver", {
                id: e.memberID
            })
        } else this.getLogin()
        */
    },
    getHn: function() {
        //a.WxService.navigateTo("/pages/index/hnqx")
        wx.navigateTo({
          url: '../index/hnqx?muid=' + this.data.user.id + "&nickname=" + this.data.user.nickname,
        })
    },
    onFollow: function(t) {
        var e = this,
            i = this.data.user;
            if(i.id == wx.getStorageSync("user").id){
              return a.WxService.showModal({
                content: "自己无法关注自己",
                showCancel: !1
              });
              return false;
            }
            http.get('flows', { uid: i.id, muid: wx.getStorageSync("user").id}).then(data => {
              data.isFollowing == 1 ? e.showToastText("关注成功", 2e3) : e.showToastText("已取消关注", 1500);
              e.setData({ user: data});
              http.get('user', { uid: this.id, muid: wx.getStorageSync("user").id }).then(data => {
                this.setData({ user: data });
              });
              http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
                this.setData({ muser: data });
              });  
            });
        /*    
        if (console.log(i.userinfo.sex, i.gender), a.WxService.getStorageSync("us")) {
            if (i.userinfo.sex != i.gender) {
                var o = this.data.personal.isFollowing ? 0 : 1;
                if (0 != o && this.setData({
                    zanEvent: !0
                }), setTimeout(function() {
                    return e.setData({
                        zanEvent: !1
                    })
                }, 2e3), a.WxService.getStorageSync("us")) {
                    if (this.data.us.uid == i.memberID) return a.WxService.showModal({
                        content: "自己无法关注自己",
                        showCancel: !1
                    });
                    this.follow.queryAsync({
                        memberid: i.memberID,
                        status: o
                    }).then(function(t) {
                        200 == t.code ? (e.setData({
                            "personal.isFollowing": !e.data.personal.isFollowing
                        }), e.data.personal.isFollowing ? e.showToastText("关注成功", 2e3) : e.showToastText("已取消关注", 1500)) : e.showToastSuc(t.data)
                    })
                } else this.getLogin()
            }
        } else this.getLogin()
        */
    },
    onCollect: function(t) {
        var e = this.data.personal;
        if (a.WxService.getStorageSync("us")) {
            if (this.data.us.uid == e.memberID) return a.WxService.showModal({
                content: "自己无法跟自己打招呼",
                showCancel: !1
            });
            if (this.data.is_collect) return;
            var i = this.data.is_collect ? 0 : 1,
                o = this;
            this.collect.queryAsync({
                memberid: e.memberID,
                status: i
            }).then(function(t) {
                200 == t.code ? (o.showToastSuc(t.data), o.setData({
                    is_collect: !0
                })) : o.showToastSuc(t.data)
            })
        } else this.getLogin()
    },
    previewImage: function(t) {
        if (a.WxService.getStorageSync("us")) {
            var e = this.data.personal.thumblist,
                i = t.currentTarget.dataset.index,
                o = e[Number(i)];
            if (1 != this.data.personal.avatarStatus) return a.WxService.showModal({
                title: "提示",
                content: "上传一张真实头像才能查看哦"
            }).then(function(t) {
                return 1 == t.confirm && a.WxService.navigateTo("/pages/u/index")
            });
            if (1 == this.data.personal.photoLock) return a.WxService.showModal({
                title: "提示",
                showCancel: !0,
                cancelText: "取消",
                confirmText: "去认证",
                content: "为保证平台用户真实性以及遵守相关运营规范，请完善您的实名认证信息"
            }).then(function(t) {
                return 1 == t.confirm && a.WxService.navigateTo("/pages/u/verify/step1")
            });
            if (2 == this.data.personal.photoLock) return a.WxService.showModal({
                title: "提示",
                showCancel: !0,
                cancelText: "取消",
                confirmText: "成为VIP",
                content: "抱歉，该用户只允许VIP查看"
            }).then(function(t) {
                return 1 == t.confirm && a.WxService.navigateTo("/pages/buy/payment")
            });
            wx.previewImage({
                current: o,
                urls: e
            })
        } else this.getLogin()
    },
    previewImage_avatar: function(t) {
        if (a.WxService.getStorageSync("us")) {
            var e = [this.data.personal.avatarURL];
            wx.previewImage({
                urls: e
            })
        } else this.getLogin()
    },
    getLogin: function() {
        a.WxService.showLoading({
            title: "您还未登录"
        }), setTimeout(function() {
            a.WxService.hideLoading(), a.WxService.navigateTo("/pages/register/step/step1")
        }, 1e3)
    },
    getBasicCheck: function() {
        a.WxService.getStorageSync("user") ? a.WxService.navigateTo("/pages/u/edit/index") : this.getLogin()
    },
    getVip: function() {
        a.WxService.getStorageSync("user") ? a.WxService.navigateTo("/pages/buy/payment") : this.getLogin()
    },
    getMoreCheck: function() {
        a.WxService.getStorageSync("us") ? wx.reLaunch({
            url: "/pages/u/index"
        }) : this.getLogin()
    },
    getWantCheck: function() {
        a.WxService.getStorageSync("us") ? wx.reLaunch({
            url: "/pages/u/index"
        }) : this.getLogin()
    },
    maskHideFilter2:function(){
      this.setData({ sp1: 0 });
      return false;
    },
    getContact: function() {
       var t = this.data.user.isauth;
         if (2 != t) return a.WxService.showModal({
           title: "提示",
           showCancel: !0,
           cancelText: "取消",
           confirmText: "去认证",
           content: "为保证平台用户真实性以及遵守相关运营规范，请完善您的实名认证信息"
         }).then(function (t) {
           return 1 == t.confirm && a.WxService.navigateTo("/pages/u/verify/step1")
         });
         if (this.data.user.isviewpay == 0 && (this.data.config.viewlink > 0)){
           this.setData({ sp1:1});
           return false;
         }
         this.setData({
           showMemberContact: 1
         })
        /*
        var t = this.data.personal.userinfo.is_card,
            e = this.data.personal;
        if (a.WxService.getStorageSync("us")) {
            if (e.userinfo.sex != e.gender) {
                if (1 != t) return a.WxService.showModal({
                    title: "提示",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "去认证",
                    content: "为保证平台用户真实性以及遵守相关运营规范，请完善您的实名认证信息"
                }).then(function(t) {
                    return 1 == t.confirm && a.WxService.navigateTo("/pages/u/verify/step1")
                });
                if (0 == this.data.personal.public) return a.WxService.showModal({
                    content: "用户未对外公开联系方式，可联系红娘与其沟通",
                    showCancel: !1
                });
                0 == this.data.personal.userinfo.is_imkey ? (this.data.showModalStatus[1] = !0, this.setData({
                    showModalStatus: this.data.showModalStatus
                })) : this.setData({
                    showMemberContact: !0
                })
            }
        } else this.getLogin()
        */
    },
    getShowMessage: function(e) {
        var i = this,
            o = this.data.personal;
        if (a.WxService.getStorageSync("us")) {
            if (this.data.us.uid == o.memberID) return a.WxService.showModal({
                content: "自己无法获取自己的联系方式",
                showCancel: !1
            });
            if (0 == o.userinfo.is_imkey && 0 == o.userinfo.imkey) return "ios" == a.WxService.getStorageSync("systemInfo").platform && 1 == this.data.personal.ios_pay ? a.WxService.showModal({
                content: "小程序暂不支持充值！",
                showCancel: !1
            }) : a.WxService.showModal({
                content: "剩余沟通次数不足，充值购买次数！",
                showCancel: !1
            }).then(function() {
                return a.WxService.navigateTo("/pages/buy/payment")
            });
            this.usekey.getAsync({
                id: this.id
            }).then(function(e) {
                var a;
                i.data.showModalStatus[1] = !1, i.data.showModalStatus[2] = !0;
                var o = e.data;
                "" == o.wechat || o.qq, i.setData((a = {
                    showModalStatus: i.data.showModalStatus,
                    showMemberContact: !0
                }, t(a, "personal.userinfo.is_imkey", !0), t(a, "personal.contact", e.data), a))
            })
        } else this.getLogin()
    },
    showContact: function() {
        console.log(this.data.personal.contact.wechat), this.data.showModalStatus[2] = !0, this.setData({
            showModalStatus: this.data.showModalStatus
        })
    },
    hideContact: function() {
        this.setData({
          showMemberContact: 0,
          visible:0,
        });
        //a.WxService.navigateTo("/pages/index/index")
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
    showToastErr: function(t) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    showToastCancel: function(t) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    showToastText: function(t, e) {
        this.$wuxToast.show({
            type: "text",
            timer: e || 1500,
            color: "#fff",
            text: "" + t
        })
    },
    initButton: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bottomRight";
        this.button = this.$wuxButton.init("br", {
            position: t,
            buttons: [{
                label: "首页",
                icon: "http://wx-img.jhrx.cn/love/rightmenu/170525_574eidg46bg47i32a67e1c55fl4cf_68x68.jpg"
            }, {
                label: "活动",
                icon: "http://wx-img.jhrx.cn/love/rightmenu/activity.png"
            }, {
                label: "发现",
                icon: "http://wx-img.jhrx.cn/love/rightmenu/170509_8gg7lijbde4448ekg6h0k7ecfg2h1_38x38.png"
            }, {
                label: "我的",
                icon: "http://wx-img.jhrx.cn/love/rightmenu/170526_3bj1i8bfl0f6dkef49cf18cl0hl78_68x68.jpg"
            }],
            buttonClicked: function(t, e) {
                return 3 === t && wx.reLaunch({
                    url: "/pages/u/index"
                }), 2 === t && wx.reLaunch({
                    url: "/pages/find/index"
                }), 1 === t && wx.reLaunch({
                    url: "/pages/activity/list"
                }), 0 === t && wx.reLaunch({
                    url: "/pages/index/index"
                }), !0
            },
            callback: function(t, e) {
                t.setData({
                    opened: e
                })
            }
        })
    },
    onShareAppMessage: function() {
        return {
            title: this.data.config.sharetitle,
            path: "/pages/index/member?id=" + this.data.user.id,
            imageUrl: this.data.config.url+this.data.config.sharelogo
        }
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
    copylink: function(t) {
        var e = this,
            i = "",
            o = "";
        "0" == t.currentTarget.dataset.state ? (i = this.data.user.wechat, o = "复制微信号成功") : (i = this.data.user.qq, o = "复制QQ号成功"), i ? wx.setClipboardData({
            data: i,
            success: function(t) {
                a.WxService.showModal({
                    content: o,
                    showCancel: !1
                })
                
            },
            fail: function() {
                e.copyErr()
            }
        }) : e.copyErr()
        e.setData({ showMemberContact:0});
    },
    copyErr: function() {
        a.WxService.showModal({
            content: "复制失败，请稍后重试或联系红娘客服",
            showCancel: !1
        }).then(function(t) {
            return 1 == t.confirm
        })
    },
    voicePlay: function() {
      var e = this,
        t = "00";
      t = e.data.user.voice_times < 10 ? "0" + e.data.user.voice_times : e.data.user.voice_times, "播放" == this.data.voice_type ? (i.src = this.data.user.voice_path, i.autoplay = !0, o = this.data.user.voice_times, e.setData({
        voice_type: "停止"
      }), a = setInterval(function () {
        o-- , e.data.user.voice_times = o < 10 ? "0" + o : o, e.setData({
          "personal.voice_times": e.data.user.voice_times
        }), o < 0 && (clearInterval(a), i.stop(), e.setData({
          voice_type: "播放",
          "user.voice_times": e.data.user.voice_times
        }))
      }, 1e3)) : "停止" == e.data.voice_type && (clearInterval(a), i.stop(), e.setData({
        voice_type: "播放",
        "user.voice_times": e.data.user.voice_times
      }))
    },
    onHide: function() {
        clearInterval(s), n.stop()
    },
    getIospay: function() {
        if ("ios" == a.WxService.getStorageSync("systemInfo").platform && 1 == this.data.personal.ios_pay) return a.WxService.showModal({
            content: "小程序暂不支持充值！",
            showCancel: !1
        });
        a.WxService.navigateTo("/pages/buy/payment")
    },
    onUnload: function() {
        clearInterval(s), n.stop(), o.removeNotification("DecryptNotification", this), o.removeNotification("GiftNotification", this), o.removeNotification("userinfoNotification", this)
    }
});