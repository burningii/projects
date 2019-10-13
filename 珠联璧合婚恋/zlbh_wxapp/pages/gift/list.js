var t = getApp(),
    a = require("../../utils/util.js"),
    i = require("../../utils/WxNotificationCenter.js");
import http from '../util/request.js'; 
Page({
    data: {
        number: 1,
        minNum: 1,
        maxNum: 999,
        showModalStatus: 0,
        list:[],
    },
    onLoad: function(a) {
      this.$wuxToast = t.Wux().$wuxToast;
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data });
      });
      http.get('giftlist').then(data => {
        this.setData({ list: data});
      });
      http.get('user', { uid: a.muid }).then(data => {
        this.setData({ muser: data });
      });
      console.log(a.muid); 
    },
    getData: function() {
        var t = this;
        this.giftData.getAsync().then(function(a) {
            (a.code = 200) && t.setData({
                gift: a.data
            })
        })
    },
    getGift: function(t) {
        var a = {
            giftid: t.currentTarget.dataset.giftid,
            giftname: t.currentTarget.dataset.giftname,
            gifticon: t.currentTarget.dataset.gifticon,
            giftprice: t.currentTarget.dataset.giftprice,
            totalprice: t.currentTarget.dataset.giftprice,
            num: 1
        };
        console.log(a);
        this.setData({
            number: 1,
            postData: a,
            showModalStatus: !0
        })
    },
    addNum: function() {
        var t = this,
            i = parseInt(t.data.number) || 0;
        i + 1 > this.data.maxNum ? a.alert.call(t, "超过了最大限量, 请调整数量") : (i += 1, this.data.postData.num = i, this.data.postData.totalprice = parseInt(this.data.postData.giftprice * i), this.setData({
            number: i,
            postData: this.data.postData
        }))
    },
    minusNum: function() {
        var t = this,
            i = parseInt(t.data.number) || 0;
        i - 1 < this.data.minNum ? a.alert.call(t, "骚年，您至少需要赠送1件礼物") : (i -= 1, this.data.postData.num = i, this.data.postData.totalprice = parseInt(this.data.postData.giftprice * i), this.setData({
            number: i,
            postData: this.data.postData
        }))
    },
    bindNumber: function(t) {
        var a = t.detail.value;
        this.data.postData.num = a, this.data.postData.totalprice = parseInt(this.data.postData.giftprice * a), this.setData({
            number: a,
            postData: this.data.postData
        })
    },
    onGivGift: function() {
        var s = this,
            e = this.data.number;
        "" == e && wx.showToast({
          title: '礼物数量不能为空',
          duration:2500,
          icon:"none"
        }), /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e) ? e < 1 ? wx.showToast({
          title: '骚年，您至少需要赠送1件礼物',
          duration: 2500,
          icon: "none"
        }) : e > 999 ? wx.showToast({
            title: '超过了最大限量, 请调整数量',
          duration: 2500,
          icon: "none"
          }) : (s.data.user.jbnums < s.data.postData.totalprice) ? wx.showToast({
            title: '您的金币不足',
            duration: 2500,
            icon: "none"
          }):
              http.get('sendgift', { uid: s.data.muser.id, muid: s.data.user.id, nums: e, id: s.data.postData.giftid, 
                totalprice: s.data.postData.totalprice}).then(data => {
                wx.showToast({
                  title: '赠送成功',
                  duration: 2500,
                  icon: "none"
                });
                s.setData({ showModalStatus:0});
          }) : wx.showToast({
                title: '请输入正确的数量',
                duration: 2500,
                icon: "none"
              })
    },
    maskHideFilter: function() {
        this.setData({
            showModalStatus: !1
        })
    },
    showToastSuc: function(t, a) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return a
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
    showToastText: function(t, a, i) {
        this.$wuxToast.show({
            type: "text",
            timer: a || 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return i
            }
        })
    }
});