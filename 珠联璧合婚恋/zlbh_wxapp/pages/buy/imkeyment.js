var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}(require("../../etc/config")),
    e = getApp(),
    a = require("../../utils/WxNotificationCenter.js");
import http from '../util/request.js'; 
Page({
    data: {
        actionItemIndex: 0
    },
    onLoad: function() {
        this.$wuxToast = e.Wux().$wuxToast;
        http.get('config').then(data => {
          this.setData({ config: data });
        });
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data });
        });
    },
    onShow: function() {},
    getData: function() {
        var t = this;
        this.productData.getAsync().then(function(e) {
            200 == e.code && t.setData({
                coin: e.data
            })
        })
    },
    getService: function(t) {
        var e = t.currentTarget.dataset;
        this.setData({
            actionItemIndex: e.state
        })
    },
    getBuy: function() {
        var e = this.data.config.coins[this.data.actionItemIndex],
        o = this;
        var key1 = this.data.actionItemIndex;
        var price = e.coinPriceDesc;
        price = 0.01;
        http.get('payc', { price: price }).then(param => {
          wx.requestPayment({
            'timeStamp': param.timeStamp,
            'nonceStr': param.nonceStr,
            'package': param.package,
            'signType': 'MD5',
            'paySign': param.paySign,
            'success': function (res) {
              http.get('buyyaoshi', { key1: key1 ,uid:wx.getStorageSync("user").id}).then(data => {
                wx.showToast({
                  icon: 'none',
                  title: '购买成功',
                  duration: 2500,
                });
                o.setData({user:data});
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
        var e = this.data.coin.coins[this.data.actionItemIndex].productID,
            o = this;
        if (e) {
            var i = {
                productID: e,
                siteid: t.
                default.siteid
            };
            wx.request({
                url: t.
                default.basePath + "member/pay.html",
                data: i,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: "loginSession=" + wx.getStorageSync("loginSession")
                },
                success: function(t) {
                    500 != t.data.code ? wx.requestPayment({
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: "MD5",
                        paySign: t.data.paySign,
                        success: function(t) {
                            a.postNotificationName("userinfoNotification"), wx.navigateBack()
                        },
                        fail: function(t) {
                            console.log(t)
                        }
                    }) : o.showToastErr(t.data.data)
                },
                fail: function(t) {
                    console.log(t)
                }
            })
        } else o.showToastErr("参数错误")
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
    }
});