const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId: 7,
        userInfo: {},
        signFlag: true,
        sizeIcon: 30
    },
    // 商家确定用户预约(商家签到)
    // signNow() {
    //     const _that = this
    //     wx.showLoading({
    //         title: '加载中',
    //         mask: true
    //     })
    //     app.request({
    //         method: 'POST',
    //         url: app.api.sign_order.sign,
    //         success: res => {
    //
    //         },
    //         complete: () => {
    //             wx.hideLoading()
    //         }
    //     })
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户id,根据id查询预订信息
        this.setData({
            userId: options.uid || ''
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        app.request({
            method: "GET",
            url: app.api.sign_order.sign_order,
            data: {
                order_id: this.data.orderId
            },
            success: res => {
                let signInfo = res.data
                let date = new Date(signInfo.pre_sign_time * 1000)
                let timeR = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
                signInfo.pre_sign_time = timeR
                this.setData({
                    userInfo: signInfo
                })
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },

    signNow() {
        // 非正常状态
        // if (this.data.userInfo.status != '1') {
        //     wx.showModal({
        //         title: '提示',
        //         content: '该预约异常',
        //         showCancel: false,
        //     })
        //     return
        // }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        app.request({
            method: 'GET',
            url: app.api.sign_order.sign,
            data: {
                order_id: this.data.orderId,
                status: this.data.userInfo.status
            },
            success: res => {
               this.data.userInfo.status = res.data.status
               this.onLoad()
            },
            complete: () => {
                wx.hideLoading()
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
