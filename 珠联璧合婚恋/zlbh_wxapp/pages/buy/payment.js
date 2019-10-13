var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}(require("../../etc/config")),
    e = getApp(),
    a = (require("../../wxParse/wxParse.js"), require("../../utils/WxNotificationCenter.js"));
import http from '../util/request.js'; 
Page({
    data: {
        logged: 0,
        indicatorDots: !0,
        indicatorColor: "hsla(0,0%,100%,.3)",
        indicatorActiveColor: "#ffffff",
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        actionItem: "0,0",
        showModalStatus: !0,
        nowPriceStr: "0.00",
    },
    onLoad: function(t) {
        this.setData({t:t.t||0});
        if (!t.t) {
          wx.setNavigationBarTitle({
            title: '开通会员',
          })
        } else {
          wx.setNavigationBarTitle({
            title: '充值金币',
          })
        }
        this.$wuxToast = e.Wux().$wuxToast;
        http.get('config').then(data => {
          this.setData({ config: data });
          if (!t.t){
            var o = this.data.config.pro[0].value[0];
          }else{
            var o = this.data.config.pro[1].value[0];
            this.setData({ actionItem:"1,0"});
          }
          this.setData({
            nowPriceStr: o.realPriceStr
          })
        });
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data });
        });
    },
    onShow: function() {
        this.getUserInfoData()
    },
    getUserInfoData: function() {
        var t = this;
        e.HttpResource("member/getBasicProfile.html").saveAsync().then(function(a) {
            if (a.code = 200) t.setData({
                userinfo: a.data.userinfo
            });
            else if (300 == a.code) return e.WxService.showModal({
                content: "未知错误，请重新登录！",
                showCancel: !1
            }).then(function() {
                return e.WxService.removeStorageSync("loginSession")
            }, e.WxService.removeStorageSync("us"), e.WxService.navigateTo("/pages/buy/payment"))
        })
    },
    getData: function() {
        var t = this;
        this.productData.getAsync().then(function(a) {
            if (200 == a.code) {
                t.uid = a.data.uid;
                var o = {
                    ios_pay: a.data.ios_pay,
                    is_special: a.data.is_special,
                    pro: [{
                        name: "充值会员",
                        value: a.data.products
                    }, {
                        name: "购买钥匙",
                        value: a.data.jb_products
                    }]
                };
                "ios" == e.WxService.getStorageSync("systemInfo").platform && 1 == a.data.ios_pay ? e.WxService.redirectTo("/pages/index/hnqx") : t.setData({
                    logged: 1,
                    items: o,
                    nowPriceStr: o.pro[0].value[0].realPriceStr
                })
            }
        })
    },
    getService: function(t) {
        var e = t.currentTarget.dataset,
            a = e.state.split(","),
            o = this.data.config.pro[a[0]].value[a[1]];
        this.setData({
            actionItem: e.state,
            nowPriceStr: o.realPriceStr
        })
    },
    getBuy: function() {
        var o = this.data.actionItem.split(","),
            i = this.data.config.pro[o[0]].value[o[1]],
            s = this;
            //i.realPriceStr = 0.01;
            http.get('payc', { price: i.realPriceStr }).then(param => {
              wx.requestPayment({
                'timeStamp': param.timeStamp,
                'nonceStr': param.nonceStr,
                'package': param.package,
                'signType': 'MD5',
                'paySign': param.paySign,
                'success': function (res) {
                  http.get('buyvip', { key1: o[0], key2: o[1],uid:wx.getStorageSync("user").id}).then(data => {
                    wx.showToast({
                      icon: 'none',
                      title: '购买成功',
                      duration: 2500,
                    });
                    setTimeout(function(){
                      wx.navigateTo({
                        url: '../u/index',
                      })
                    },2500);
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
        if (i) {
            var n = {
                pay_type: o[0],
                productID: i,
                siteid: t.
                default.siteid
            };
            "ios" == e.WxService.getStorageSync("systemInfo").platform && 1 == this.data.items.ios_pay ? e.WxService.redirectTo("/pages/index/hnqx") : (wx.showToast({
                title: "加载中",
                icon: "loading",
                duration: 1e4,
                mask: !0
            }), wx.request({
                url: t.
                default.basePath + "member/pay.html",
                data: n,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: "loginSession=" + wx.getStorageSync("loginSession")
                },
                success: function(t) {
                    500 != t.data.code ? (wx.hideToast(), wx.requestPayment({
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: "MD5",
                        paySign: t.data.paySign,
                        success: function(t) {
                            a.postNotificationName("UserNotification"), wx.navigateBack()
                        },
                        fail: function(t) {
                            console.log(t)
                        }
                    })) : s.showToastErr(t.data.data)
                },
                fail: function(t) {
                    console.log(t)
                }
            }))
        } else s.showToastErr("参数错误")
        */
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
        a.postNotificationName("UserNotification")
    }
});