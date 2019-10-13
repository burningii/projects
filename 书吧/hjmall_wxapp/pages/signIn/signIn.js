const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeSignIndex: 0,
        signInfo: [],
        codeImg: null,
        showQrCodeVisible: false,
        qrCodeSrc: '', // 核销码图片路径
        showMoneyInfo: false,
        nowSignList: [],
        pre_time_name: '', // 消费的套餐名
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(123)
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        app.request({
            method: "POST",
            url: app.api.sign_order.my_sign,
            success: res => {
                let signInfo = res.data
                // 当前可预订的时间段
                let currentDate = new Date(signInfo.current_time*1000)
                signInfo.list.forEach(item => {
                    let date = new Date(item.pre_sign_time * 1000)
                    let month1 = date.getMonth()+1
                    let timeR = date.getFullYear() + "-" + month1 + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
                    if(date>currentDate){
                        item.showQrcode=false
                    }else{
                        item.showQrcode=true
                    }
                    item.pre_sign_time = timeR
                    // 处理是否显示核销码

                })
                this.setData({
                    signInfo: signInfo
                })
                let tempListNow = []
                let tempList = this.data.signInfo.list
                tempList.forEach(item => {
                    if (item.status == "1" || item.status == '2' || item.status == '0') {
                        tempListNow.push(item)
                    }
                })
                this.setData({
                    nowSignList: tempListNow
                })
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },
    // 展示二维码
    showQrCode(event) {
        this.setData({
            showQrCodeVisible: true
        })
        const _that = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        app.request({
            url: app.api.sign_order.get_qrcode,
            data: {
                order_id: event.currentTarget.id
            },
            method: 'GET',
            success: res2 => {
                if (res2.code == "0") {
                    _that.setData({
                        qrCodeSrc: res2.data.url
                    })
                }
               // 核销码请求之后, 循环调用核销状态,进行消费提示
                let timer = setInterval(() => {
                    app.request({
                        method: "POST",
                        url: app.api.sign_order.my_sign,
                        data: {
                            order_id: event.currentTarget.id
                        },
                        success: res => {
                            if (res.data.list[0].status=='3'){
                                clearInterval(timer)
                                if (res.data.list[0].pay_type=='0'){
                                    this.setData({
                                        pre_time_name: "新用户9.9"
                                    })
                                }else if (res.data.list[0].pay_type=='1'){
                                    this.setData({
                                        pre_time_name: '期限卡',
                                        pre_time_name_hours: res.data.list[0].hours
                                    })
                                }else if (res.data.list[0].pay_type=='2'){
                                    this.setData({
                                        pre_time_name: '时间卡',
                                        pre_time_name_time_hours: res.data.list[0].hours
                                    })
                                }
                                this.setData({
                                    showMoneyInfo: true,
                                    showQrCodeVisible: false
                                })
                            }
                        },
                        complete: () => {
                            wx.hideLoading()
                        }
                    })
                }, 2000)
            },
            complete: ()=>{
                wx.hideLoading()
            }
        })
    },

    onClose() {
        this.setData({
            showQrCodeVisible: false
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
