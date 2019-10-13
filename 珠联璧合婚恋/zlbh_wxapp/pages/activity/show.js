var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, e = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(require("../../etc/config")),
    a = getApp(),
    i = require("../../wxParse/wxParse.js"),
    o = require("../../utils/auth.js"),
    n = require("../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../util/request.js';     
Page({
    data: {
        showLoading: !0,
        showModalStatus: [!1, !1, !1],
        price:0
    },
    onLoad: function(t) {
        this.$wuxToast = a.Wux().$wuxToast, this.$wuxButton = a.Wux().$wuxButton, this.activity_id = t.id;
        http.get('config').then(data => {
          this.setData({ config: data });
        });
        var that = this;
        http.get('user',{uid:wx.getStorageSync("user").id}).then(data => {
          that.setData({user:data});
          http.get('actdeital', { id: that.activity_id, uid: wx.getStorageSync("user").id }).then(data => {
            that.setData({ act: data });
            i.wxParse('article', 'html', data.content, that, 5);
            if (that.data.user.vip == 1 && (that.data.user.vip1 == 0)) {
              that.setData({ price: that.data.act.vip_price });
            } else {
              that.setData({ price: that.data.act.price });
            }
          });
        });
        
       
       
    },
    didNotification: function() {
        this.userAuthorization()
    },
    backhome: function() {
        getCurrentPages().length >= 2 ? wx.navigateBack() : wx.redirectTo({
            url: "/pages/activity/index"
        })
    },
    userAuthorization: function() {
        a.WxService.getStorageSync("loginSession") ? "object" == t(a.WxService.getStorageSync("loginSession")) ? (a.WxService.removeStorageSync("loginSession"), o.authorization()) : (this.getData(), this.initButton()) : a.WxService.navigateTo("/pages/decrypt/index")
    },
    onShow: function() {},
    getData: function() {
        var t = this;
        this.act_show.getAsync().then(function(e) {
            if (e.code = 200) t.setData({
                act: e.data,
                showLoading: !1,
                act_nums: e.data.act_nums
            }), i.wxParse("text1", "html", t.data.act.content, t, 5);
            else if (300 == e.code) return a.WxService.showModal({
                content: "未知错误，请重新登录！",
                showCancel: !1
            }).then(function() {
                return a.WxService.removeStorageSync("loginSession")
            }, a.WxService.removeStorageSync("us"), a.WxService.navigateTo("/pages/buy/payment"))
        })
    },
    getLogin: function() {
        a.WxService.getStorageSync("us") ? a.WxService.navigateTo("/pages/activity/show") : (a.WxService.showLoading({
            title: "您还未登录"
        }), setTimeout(function() {
            a.WxService.hideLoading(), a.WxService.navigateTo("/pages/register/step/step1")
        }, 1e3))
    },
    getSignup: function() {
        var t = this;
        http.get('payc', { price: t.data.price }).then(param => {
          wx.requestPayment({
            'timeStamp': param.timeStamp,
            'nonceStr': param.nonceStr,
            'package': param.package,
            'signType': 'MD5',
            'paySign': param.paySign,
            'success': function (res) {
              http.get('setbao', { uid: wx.getStorageSync("user").id, aid: t.data.act.id }).then(data => {
                wx.showToast({
                  icon: 'none',
                  title: '报名成功',
                  duration: 3500,
                });
                setTimeout(function(){
                  http.get('actdeital', { id: t.data.act.id, uid: wx.getStorageSync("user").id, price: t.data.price}).then(data => {
                    t.setData({ act: data });
                    i.wxParse('article', 'html', data.content, t, 5);
                  });
                },3500);
              });
            },
            'fail': function (fail) {
              wx.showToast({
                icon: 'none',
                title: '付款失败',
                duration: 3500,
              });
            }
          });
        });
        /*
        a.WxService.getStorageSync("us") ? this.data.act_nums > 0 ? a.WxService.showModal({
            title: "提示",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确认",
            content: "您剩余报名次数剩余" + this.data.act_nums + "次，确认报名吗？"
        }).then(function(e) {
            return 1 == e.confirm && t.wxpay({
                money: t.data.act.price
            })
        }) : this.wxpay({
            money: this.data.act.price
        }) : (a.WxService.showLoading({
            title: "您还未登录"
        }), setTimeout(function() {
            a.WxService.hideLoading(), a.WxService.navigateTo("/pages/register/step/step1")
        }, 1e3))
        */
    },
    wxpay: function(t) {
        t.money;
        var i = this,
            o = {
                siteid: e.
                default.siteid,
                activity_id: i.activity_id
            };
        if ("ios" == a.WxService.getStorageSync("systemInfo").platform && 1 == this.data.act.ios_pay) return a.WxService.showModal({
            content: "小程序暂不支持此功能！",
            showCancel: !1
        });
        wx.request({
            url: e.
            default.basePath + "member/pay.html",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                Cookie: "loginSession=" + wx.getStorageSync("loginSession")
            },
            success: function(t) {
                if (500 == t.data.code) return 1 == t.data.data.status ? (i.showToastSuc(t.data.data.msg), void i.setData({
                    "act.is_apply": !0
                })) : void i.showToastErr(t.data.data.msg);
                300 != t.data.code ? wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: "MD5",
                    paySign: t.data.paySign,
                    success: function(t) {
                        i.data.act.is_apply = !0, i.setData({
                            act: i.data.act
                        })
                    },
                    fail: function(t) {}
                }) : i.showToastErr(t.data.data)
            },
            fail: function(t) {
                console.log(t)
            }
        })
    },
    onShareAppMessage: function() {
        var t = "";
        return {
            title: "" + this.data.act.title,
            path: "/pages/activity/show?id=" + this.data.act.id + "&fromuid=" + a.WxService.getStorageSync("us").uid,
            success: function(e) {
                console.log(e.shareTickets[0]), e.shareTickets && a.WxService.login().then(function(i) {
                    console.log("wechatDecryptData", i.code), t = i.code, wx.getShareInfo({
                        shareTicket: e.shareTickets[0],
                        success: function(e) {
                            e.activity_id = a.data.activity_id, e.code = t
                        },
                        fail: function() {},
                        complete: function() {}
                    })
                })
            }
        }
    },
    goToMapPage: function(t) {
        var e = t.currentTarget.dataset.title,
            i = t.currentTarget.dataset.address;
        i && i.lat && i.lng ? a.WxService.openLocation({
            latitude: parseFloat(i.lat),
            longitude: parseFloat(i.lng),
            name: e
        }) : a.WxService.showModal({
            content: "抱歉，暂时找不到地图",
            showCancel: !1
        })
    },
    showToastErr: function(t) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1e3,
            color: "#fff",
            text: "" + t
        })
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
    maskHideFilter: function(t) {
        var e = t.currentTarget.dataset.status;
        this.data.showModalStatus[e] = !1, this.setData({
            showModalStatus: this.data.showModalStatus,
            animateCss: "weui-animate-fade-out"
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
    showKefuEvent: function() {
        this.setData({
            showKefuStatus: !0
        })
    },
    hideKefuEvent: function() {
        this.setData({
            showKefuStatus: !1
        })
    }
});