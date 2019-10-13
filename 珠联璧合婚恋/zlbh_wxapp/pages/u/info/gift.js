function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e
    }
    return Array.from(t)
}
var a = getApp(),
    e = require("../../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../../util/request.js';
Page({
    data: {
        tabs: ["收到的礼物", "发出的礼物"],
        sexDataType: ["", "他", "她"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        collect: {},
        hasMore: !0,
        is_collect: !1,
        showLoading: !0,
        showModalStatus: [!1],
        backTopValue: false,
        nodata: false,
        list: [],
        allPages: 0,
        page: 1,
        loadMoreData: "下拉加载更多",
    },
    onLoad: function() {

      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        this.setData({ user: data, avatar: data.avatar });
      });
      http.get('config').then(data => {
        this.setData({ config: data });
      });
      this.$wuxActionSheet = a.Wux().$wuxActionSheet;
      this.initData();
    },
    onShow: function() {
       
    },
    userinfoNotification: function(t) {
     
    },
    initData: function() {
      var o = this;

      var d = {};
      d.page = o.data.page;
      d.activeIndex = o.data.activeIndex;
      d.uid = wx.getStorageSync("user").id;
      http.get('getgiftlist', d).then(data => {
        if (data.list.length == 0) {
          o.setData({ nodata: true });
        }
        if (o.data.page == 1) {
          var tempArray = [];
        } else {
          var tempArray = that.data.list;
        }
        var list = o.data.page == 1 ? data.list : tempArray.concat(data.list);
        list = list.length > 0 ? list : null;
        o.setData({ list: list, allPages: data.totalPage });
        if (data.list == null) {
          o.setData({ hasMore: 0 });
        }
      });
    },
    getList: function() {
        
    },
    onTabClick: function(t) {
        var a = t.currentTarget.dataset.id,
            e = {
                items: [],
                params: {
                    page: 1,
                    limit: 10,
                    type: a
                },
                paginate: {
                    hasNext: !0
                }
            };
        this.setData({
            type: a,
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: a,
            collect: e,
            showLoading: !0
        }), this.initData()
    },
    getGift: function(t) {
        var e = t.currentTarget.dataset.id,
            i = t.currentTarget.dataset.nickname;
        a.WxService.navigateTo("/pages/gift/list", {
            memberID: e,
            nickname: i
        })
    },
    getMsg: function(t) {
        var e = t.currentTarget.dataset.id,
            i = t.currentTarget.dataset.index;
        0 == this.data.collect.items[i].is_imkey ? (this.data.showModalStatus[0] = !0, this.setData({
            activeChatIndex: i,
            showModalStatus: this.data.showModalStatus
        })) : a.WxService.navigateTo("/pages/im/imver", {
            id: e
        })
    },
    getMessage: function(t) {
        var e = this.data.collect,
            i = this.data.userinfo;
        if (a.WxService.getStorageSync("us")) {
            if (0 == e.items[this.data.activeChatIndex].is_imkey && 0 == i.imkey) return a.WxService.showModal({
                content: "剩余沟通次数不足，充值购买次数！",
                showCancel: !1
            }).then(function() {
                return a.WxService.navigateTo("/pages/buy/imkeyment")
            });
            this.data.showModalStatus[0] = !1, this.setData({
                showModalStatus: this.data.showModalStatus
            }), a.WxService.navigateTo("/pages/im/imver", {
                id: e.items[this.data.activeChatIndex].id
            })
        } else this.getLogin()
    },
    maskHideFilter: function(t) {
        var a = t.currentTarget.dataset.status;
        this.data.showModalStatus[a] = !1, this.setData({
            showModalStatus: this.data.showModalStatus,
            animateCss: "weui-animate-fade-out"
        })
    },
    onReachBottom: function() {
        console.info("onReachBottom"), this.data.collect.paginate.hasNext && this.getList()
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
    onUnload: function() {
        e.removeNotification("userinfoNotification", this)
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
    }
});