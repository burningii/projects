var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}(require("../../etc/config")),
    e = getApp();
Page({
    data: {
        actionItemIndex: 0
    },
    onLoad: function() {
        this.$wuxToast = e.Wux().$wuxToast, this.productData = e.HttpResource("/coinlist.html"), this.uploadImageUrl = e.HttpResource("/ajax.php"), this.getData()
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
        var e = this.data.coin.coins[this.data.actionItemIndex].productID,
            a = this;
        if (e) {
            var o = {
                productID: e,
                siteid: t.
                default.siteid
            };
            wx.request({
                url: t.
                default.basePath + "member/pay.html",
                data: o,
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
                            wx.navigateBack()
                        },
                        fail: function(t) {
                            console.log(t)
                        }
                    }) : a.showToastErr(t.data.data)
                },
                fail: function(t) {
                    console.log(t)
                }
            })
        } else a.showToastErr("参数错误")
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