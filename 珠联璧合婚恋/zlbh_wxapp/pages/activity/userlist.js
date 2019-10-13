function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, i = Array(t.length); a < t.length; a++) i[a] = t[a];
        return i
    }
    return Array.from(t)
}
var a = getApp();
const app = getApp()
import http from '../util/request.js'; 
Page({
    data: {
        hasMore: !0,
        act: {}
    },
    onLoad: function(t) {
        this.id = t.id;
        http.get('config').then(data => {
          this.setData({ config: data });
        });
        http.get('actdeital', { id: this.id, uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ act: data });
        });
    },
    initData: function() {
        this.data.act.params && this.data.act.params.type;
        var t = {
            list: [],
            params: {
                page: 1,
                limit: 20
            },
            paginate: {
                hasNext: !0
            }
        };
        this.setData({
            act: t
        })
    },
    getList: function() {
        var a = this,
            i = this.data.act,
            s = {};
        this.data.hasMore && (this.setData({
            hasMore: !1
        }), s.page = i.params.page++, this.act.queryAsync(s).then(function(s) {
            200 == s.code && (i.list = [].concat(t(i.list), t(s.data.list)), i.paginate = s.data.paginate, a.setData({
                hasMore: !0,
                act: i
            }))
        }))
    },
    onPullDownRefresh: function() {
        console.info("onPullDownRefresh"), this.getList()
    },
    onReachBottom: function() {
        this.data.act.paginate.hasNext && this.getList()
    }
});