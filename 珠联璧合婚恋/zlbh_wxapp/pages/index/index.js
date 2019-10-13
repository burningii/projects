function t(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}
function a(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e
    }
    return Array.from(t)
}
var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, i = t(require("../../json/cate.js")),
    n = (t(require("../../etc/config")), getApp()),
    s = require("../../utils/auth.js"),
    r = require("../../utils/util.js"),
    o = require("../../utils/WxNotificationCenter.js");
Date.parse(new Date);
import http from '../util/request.js'; 
Page({
    data: {
        showModalStatus: !1,
        msgStatus: !1,
        sexDataType: ["", "他", "她"],
        hasMore: !0,
        qingyuan: {},
        logged: 0,
        showFilter: !1,
        animateCss: void 0,
        cate: {},
        searchKey: {},
        searchData: {
            age: "不限",
            height: "不限"
        },
        userCheck: {
            basic_check: 1,
            is_introduce: 1,
            more_check: 1,
            want_check: 1
        },
        tabtype: 0,
        serach:0,
        kefu:0,
        wenan:0,
        s1:0,
        curpage:'index',
        backTopValue: false,
        nodata: false,
        list: [],
        allPages: 0,
        page: 1, 
        loadMoreData: "下拉加载更多",
        backTopValue: false,
        top: 0,
    },
    backTop: function () {
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    onLoad: function() {
      this.getCate();
      //this.getData();
      
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
        this.setData({config:data});
      });
      http.get('user',{uid:wx.getStorageSync("user").id}).then(data => {
        this.initData();
        this.setData({ user: data });
      });
    
    },
    onReady: function() {},
    didNotification: function() {
        this.userAuthorization()
    },
    userAuthorization: function() {
      
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
      });
    },
    initData: function() {
      var o = this;
      var i = this.data.searchKey;
      var s = {
        age: r.ageConvert(i.minAge||"", i.maxAge||""),
        height: r.heightConvert(i.minHeight || "", i.maxHeight || "")
      }
      o.setData({
        searchData: s
      })
      var d = {
        orderby: o.data.tabtype || 0,
        maxAge: i.maxAge || 0,
        minAge: i.minAge || 0,
        minHeight: i.minHeight || 0,
        maxHeight: i.maxHeight || 0,
        marriageString: i.objectMarriageString || "",
        salaryString: i.objectSalaryString || "",
        educationString: i.objectEducationString || "",
        gender: wx.getStorageSync("user").gender == "1" ? 2 : 1,
      };
      d.page = o.data.page;
      console.log(this.data.searchKey);
      http.get('getindexlist' , d).then(data => {
        if (data.list.length == 0) {
          o.setData({ nodata: true });
        }
        if (o.data.page == 1) {
          var tempArray = [];
        } else {
          var tempArray = o.data.list;
        }
        var list = o.data.page == 1 ? data.list : tempArray.concat(data.list);
        list = list.length > 0 ? list : null;
        o.setData({ list: list, allPages: data.totalPage });
        if (data.list == null) {
          o.setData({ hasMore: 0 });
        }
      });
       
    },
    getList: function(t) {
     
    },
    getData: function() {
        var t = this;
      
    },
    getLogin: function() {
      
    },
    getBottomLogin: function() {
        return n.WxService.showModal({
            title: "提示",
            showCancel: !0,
            cancelText: "再看看",
            confirmText: "去注册",
            content: "注册成为会员查看更多交友信息"
        }).then(function(t) {
            return 1 == t.confirm && n.WxService.navigateTo("/pages/register/step/step1")
        })
    },
    getCertUrl: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(this.data.user);
        if (2 != this.data.user.isauth) return n.WxService.showModal({
            title: "提示",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "去认证",
            content: "为保证平台用户真实性以及遵守相关运营规范，请完善您的实名认证信息"
        }).then(function(t) {
            return 1 == t.confirm && n.WxService.navigateTo("/pages/u/verify/step1")
        });
        n.WxService.navigateTo("/pages/index/member?id=", {
            id: a
        })
    },
    onPageScroll: function (e) {
      var that = this;
      var scrollTop = e.scrollTop
      var backTopValue = scrollTop > 150 ? true : false
      that.setData({
        backTopValue: backTopValue
      })
    },
    onPullDownRefresh() {
      var self = this;
      setTimeout(function () {
        if (self.data.page < self.data.allPages) {
          self.setData({
            page: self.data.page + 1
          });
          self.initData();
        } else {
          self.setData({ loadMoreData: "没有数据了" });
        }
      }, 300);
    },
    onReachBottom() {
      var self = this;
      setTimeout(function () {
        if (self.data.page < self.data.allPages) {
          self.setData({
            page: self.data.page + 1
          });
          self.initData();
        } else {
          self.setData({ loadMoreData: "没有数据了" });
        }
      }, 300);
    },
    setFilterPanel: function(t) {
        var a = this,
            e = this.data.cate;
        console.log(this.data.searchKey), e.salaryData.forEach(function(t, i) {
            t.value === a.data.searchKey.objectSalary && (e.salaryActionIndex = i)
        }), e.eduData.forEach(function(t, i) {
            t.value === a.data.searchKey.objectEducation && (e.eduActionIndex = i)
        }), this.setData({
            cate: e,
            showFilter: !this.data.showFilter,
            animateCss: "weui-animate-fade-in"
        })
    },
    maskHideFilter: function() {
        this.setData({
            showFilter: !1,
            animateCss: "weui-animate-fade-out"
        })
    },
    onEdu: function(t) {
        this.setData({
            "cate.eduActionIndex": t.detail.value,
            "searchKey.objectEducationString": this.data.cate.eduData[t.detail.value].name,
            "searchKey.objectEducation": this.data.cate.eduData[t.detail.value].value
        })
    },
    onSalary: function(t) {
        this.setData({
            "cate.salaryActionIndex": t.detail.value,
            "searchKey.objectSalaryString": this.data.cate.salaryData[t.detail.value].name,
            "searchKey.objectSalary": this.data.cate.salaryData[t.detail.value].value
        })
    },
    onMarriage: function(t) {
        this.setData({
            "cate.marriageActionIndex": t.detail.value,
            "searchKey.objectMarriageString": this.data.cate.marriageData[t.detail.value].name,
            "searchKey.objectMarriage": this.data.cate.marriageData[t.detail.value].value
        })
    },
    inputTapMinAge: function(t) {
        this.setData({
            "searchKey.minAge": t.detail.value
        })
    },
    inputTapMaxAge: function(t) {
        this.setData({
            "searchKey.maxAge": t.detail.value
        })
    },
    inputTapMinHeight: function(t) {
        this.setData({
            "searchKey.minHeight": t.detail.value
        })
    },
    inputTapMaxHeight: function(t) {
        this.setData({
            "searchKey.maxHeight": t.detail.value
        })
    },
    getCate: function() {
        var t = this.data.cate,
            a = this.data.searchKey,
            e = JSON.parse(decodeURIComponent(JSON.stringify(i.
            default)));
        e.eduData[0].name = "不限", e.salaryData[0].name = "不限", e.marriageData[0].name = "不限", t = {
            eduData: e.eduData,
            eduArr: e.eduData.map(function(t) {
                return t.name
            }),
            eduActionIndex: a.eduActionIndex || 0,
            salaryData: e.salaryData,
            salaryArr: e.salaryData.map(function(t) {
                return t.name
            }),
            salaryActionIndex: a.salaryActionIndex || 0,
            marriageData: e.marriageData,
            marriageArr: e.marriageData.map(function(t) {
                return t.name
            }),
            marriageActionIndex: a.marriageActionIndex || 0
        }, this.setData({
            searchKey: a,
            cate: t
        })
    },
    resetSearchValue: function() {
        this.setData({
            searchKey: {},
            showFilter: !1,
            animateCss: "weui-animate-fade-out"
        }), this.initData();
    },
    confirmSearchValue: function() {
        var t = this.data.searchKey;
        this.maskHideFilter(), this.initData(), this.getList(t)
    },
    onUnload: function() {
        o.removeNotification("DecryptNotification", this)
    },
    onShareAppMessage: function() {
        return {
            title: this.data.config.sharetitle,
            path: "/pages/index/index",
            imageUrl: this.data.config.url + this.data.config.sharelogo
        }
    },
    maskHideModal: function() {
        this.setData({
            showModalStatus: !this.data.showModalStatus
        })
    },
    getLogUrl: function(t) {
        n.HttpService.wechatSetFormid({
            siteid: wx.getStorageSync("siteid"),
            formId: t.detail.formId
        }), wx.reLaunch({
            url: t.target.dataset.url
        })
    },
    getTabList: function(t) {
        var a = t.target.dataset.type;
        this.setData({
            tabtype: a
        }), this.initData(), this.getList({
            type: a
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
    shower:function(){
      var current = this.data.config.url + this.data.config.gzh;
      wx.previewImage({
        current: current, 
        urls: [current] 
      })
    }
});