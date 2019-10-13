const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seatName: "",
        seatId: "",
        storeName: '',
        storeImg: '',
        showPickerVisible: false,
        showPickerTimeVisible: false,
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        maxDate: new Date(new Date().getFullYear(), 11, 31).getTime(),
        currentTime: "08:00",
        minHour: 0,
        maxHour: 0,
        minMinute: 0,
        maxMinute: 59,
        current_order_time: null,
        current_time: null,
        fullDayVisible: 'default',
        timeCheckVisible: 'danger',
        showNoticeVisible: false,
        showSuccessVisible: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取位置号
        this.setData({
            seatName: options.seatName,
            seatId: options.seatId,
            storeName: options.storeName,
            storeImg: options.storeImg
        })
        let obj = {
            seatName: this.data.seatName,
            seatId: this.data.seatId,
            storeName: this.data.storeName,
            storeImg: this.data.storeImg
        }
        wx.setStorageSync('seat_info', obj);
        wx.showLoading({
            title: '加载中',
            mask: true
        })
    },
    onClose1() {
        this.setData({showPickerVisible: false});
    },
    successNav(){
        wx.reLaunch({
            url: '/pages/index/index'
        })
    },
    onClose2() {
        this.setData({showPickerTimeVisible: false});
    },
    showPicker() {
        this.setData({showPickerVisible: true});
    },
    showPickerTime() {
        this.setData({
            showPickerTimeVisible: true
        })
    },
    // 展示注意事项
    showNotice() {
       this.setData({
           showNoticeVisible: true
       })
    },
    onInput(event) {
        let tempCurrentTime = event.detail
        let date = new Date(tempCurrentTime)
        let currentTime = ""
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        currentTime = year + "-" + month + "-" + day
        this.setData({
            current_order_time: currentTime
        });
        this.loadPicker()
    },
    onInputTime(event) {
        this.setData({
            current_time: event.detail
        })
    },
    // 选择全天按钮
    fullDay() {
        if (this.data.timeCheckVisible == 'danger') {
            this.setData({
                timeCheckVisible: 'default',
            })
        }
        this.setData({
            fullDayVisible: 'danger',
            current_time: '全天',
            current_time_full: 1
        })
    },
    // 选择时间段
    checkTimeBetween() {
        if (this.data.fullDayVisible == 'danger') {
            this.setData({
                fullDayVisible: 'default',
            })
        }
        this.setData({
            timeCheckVisible: 'danger',
            current_time: this.data.nowDateTimeCheck,
            current_time_full: 0
        })

        this.setData({
            showPickerTimeVisible: true
        })

    },
    orderNow() {
        const _that = this
        let tempTime
        let tempTimeshow
        if (this.data.current_time_full && this.data.current_time_full == 1) {
            tempTime = _that.data.current_order_time + " " + 12 + ":" + "00"
            tempTimeshow = _that.data.current_order_time + '全天'
        } else {
            tempTime = _that.data.current_order_time + " " + _that.data.current_time + ":" + "00"
            tempTimeshow = tempTime
        }
        //let tempTime = _that.data.current_order_time + " " + _that.data.current_time+":"+"00"
        let showTimeTemp = _that.data.current_order_time + " " + _that.data.current_time
        let temptime1 = tempTime.replace(/-/g, '/')
        let timestap = (Date.parse(temptime1)) / 1000
        let currentSeatId = _that.data.seatId
        wx.showModal({
            title: '确认预约时间',
            content: `时间: ${tempTimeshow}`,
            success: res => {
                if (res.confirm) {
                    wx.showLoading({
                        title: '加载中',
                        mask: true
                    })
                    app.request({
                        method: 'POST',
                        url: app.api.sign_order.pre_sign,
                        data: {
                            sid: currentSeatId,
                            pre_sign_time: timestap,
                            full_day: this.data.current_time_full == 1 ? 1 : 0
                        },
                        success: res => {
                            if (res.code==0){
                                if (res.data.status == 1) { // 预约成功
                                    _that.setData({
                                        showTimeTemp: showTimeTemp,
                                        showSuccessVisible: true
                                    })
                                    // wx.showModal({
                                    //     title: '成功',
                                    //     content: `位置号: ${_that.data.seatName}, 时间为: ${showTimeTemp}`,
                                    //     showCancel: false,
                                    //     success: res2 => {
                                    //         if (res2.confirm) {
                                    //             wx.reLaunch({
                                    //                 url: '/pages/index/index'
                                    //             })
                                    //         }
                                    //     }
                                    // })
                                } else if (res.data.status == 0) {
                                    wx.showModal({
                                        title: '提示',
                                        content: '系统错误,请稍后再试',
                                        showCancel: false,
                                    })
                                } else if (res.data.status == -1) { //新用户
                                    // wx.navigateTo({
                                    //     url: '/pages/pay/pay?flag=0'
                                    // })
                                    wx.navigateTo({
                                        url: '/pages/goods/goods?id=5'
                                    })
                                } else if (res.data.status == -2) { // 购买相关套餐
                                    // wx.navigateTo({
                                    //     url: '/pages/pay/pay?flag=1'
                                    // })
                                    wx.navigateTo({
                                        url: '/pages/list/list'
                                    })
                                } else if (res.data.status == -3) {
                                    wx.showModal({
                                        title: '提示',
                                        content: `${res.msg}`,
                                        showCancel: false,
                                    })
                                } else if (res.data.status == -4) {
                                    wx.showModal({
                                        title: '提示',
                                        content: `${res.msg}`,
                                        showCancel: false,
                                    })
                                } else if (res.data.status == -5) {
                                    wx.showModal({
                                        title: '提示',
                                        content: `${res.msg}`,
                                        showCancel: false,
                                    })
                                }
                            }else{
                                wx.navigateTo({
                                    url: '/pages/verficity/index?flag2=1'
                                })
                            }

                        },
                        complete: () => {
                            wx.hideLoading()
                        }
                    })
                } else {

                }
            }
        })
    },
    // 时间渲染
    loadPicker() {
        if (this.data.current_order_time) {
            let date2 = new Date()
            // 当前预约的日期
            let currentSelectTime = Number(this.data.current_order_time.split("-")[2])
            let currentSelectMonth = Number(this.data.current_order_time.split("-")[1])
            let nowDate = date2.getDate() // 获取day
            let nowMonth = date2.getMonth() + 1
            if (currentSelectTime > nowDate || currentSelectMonth > nowMonth) {
                // console.log('大')
                this.setData({
                    minHour: 8,
                    maxHour: 22,
                    minMinute: 0,
                    maxMinute: 59,
                })
            } else if (currentSelectTime == nowDate && currentSelectMonth == nowMonth) {
                let currentHours = new Date().getHours() + 1 + ":" + "00"
                let currentMinHour = new Date().getHours() + 1
                let miHoursFlag
                if (currentMinHour < 8) {
                    miHoursFlag = true
                } else if (currentMinHour >= 21) {
                    let day3 = new Date();
                    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
                    this.setData({
                        minDate: day3.getTime()
                    })
                }
                //minDate
                this.setData({
                    currentTime: currentHours,
                    minHour: miHoursFlag ? 8 : currentMinHour,
                    maxHour: 22,
                })
                // if (this.data.minHour >= this.data.maxHour) {
                //     this.setData({
                //         current_order_time_flag: false
                //     })
                // }
            }
            this.setData({
                nowDateTimeCheck: this.data.currentTime
            })
        }
        wx.hideLoading()
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
