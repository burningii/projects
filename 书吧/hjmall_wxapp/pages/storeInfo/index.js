const WxParse = require("../../wxParse/wxParse.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeInfo: {
            // id: 1,
            // title: '牛市口店',
            // avator: 'https://api3.qibuluo.net/addons/zjhj_mall/core/web/uploads/image/store_2/f5084ca47e62b64ebad0357e3a71f7d0a67cbe75.gif',
            // banner: 'https://api3.qibuluo.net/addons/zjhj_mall/core/web/uploads/image/store_2/f5084ca47e62b64ebad0357e3a71f7d0a67cbe75.gif',
            // businessTime: '08:00 - 22:00',
            // location: '成华区交大绿岭一期',
            // detailsInfo: '<p><span>店铺详情</span><img src="https://api3.qibuluo.net/addons/zjhj_mall/core/web/uploads/image/store_2/f5084ca47e62b64ebad0357e3a71f7d0a67cbe75.gif"/></p>',
            // // etailsInfo: "<p>123</p>",
            // // detailInfo: null
        },
        currentStore: null

    },

    showSelectLocation() {
        wx.navigateTo({
            url: `../selectLocation/index?storeid=${this.data.storeInfo.id}`
        })
    },

    // 跳转到地理位置
    GoTo(){
        var t = this;
        "undefined" != typeof my ? t.location() : getApp().core.getSetting({
            success: function(e) {
                e.authSetting["scope.userLocation"] ? t.location() : getApp().getauth({
                    content: "需要获取您的地理位置授权，请到小程序设置中打开授权！",
                    cancel: !1,
                    author: "scope.userLocation",
                    success: function(e) {
                        e.authSetting["scope.userLocation"] && t.location();
                    }
                });
            }
        });
    },
    location: function() {
        var e = this.data.currentStore;
        console.log(parseFloat(e.latitude))
        console.log(parseFloat(e.longitude))
        getApp().core.openLocation({
            latitude: parseFloat(e.latitude),
            longitude: parseFloat(e.longitude),
            name: e.name,
            address: e.address
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _that = this
        const storeid = options.storeid
        this.setData({
            id: storeid
        })
        wx.showLoading({
            title: '加载中',
            mask:true
        })
        let shop_list =  wx.getStorageSync('shop_list');
        shop_list.forEach(item=>{
            if (item.id==this.data.id){
                this.setData({
                    currentStore: item
                })
                wx.hideLoading()
            }
        })

        let storeInfoNew = this.data.currentStore
        // storeInfoNew.businessTime = "08:00 - 21:00"
        // storeInfoNew.location = "成华区春熙路"
        // storeInfoNew.detailsInfo = '<p><span>店铺详情</span><img src="https://api3.qibuluo.net/addons/zjhj_mall/core/web/uploads/image/store_2/f5084ca47e62b64ebad0357e3a71f7d0a67cbe75.gif"/></p>'
        this.setData({
            storeInfo: storeInfoNew
        })


        // getApp().request({
        //     url: getApp().api.default.index,
        //     // data: t,
        //     success: function (t) {
        //         console.log(t)
        //     }
        //
        // })
        WxParse.wxParse("detail", "html", _that.data.storeInfo.main_content, _that);
    },

    // 拨打电话
    callPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.storeInfo.tel,
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
