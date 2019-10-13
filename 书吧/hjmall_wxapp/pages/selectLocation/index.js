const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModal: false,
        activeTimeCheckIndex: 0,
        // 所有房间的集合
        storeInfo: {},
        timer: null,
        seatArea: '2',
        currentSeat: null, // 当前选中的位置x
        apartmen1: "https://api1.qibuluo.net/attachment/images/2/niushikou@.jpg",
        apartmen2: "https://api1.qibuluo.net/attachment/images/2/guanghuazhongxin.png",
        apartmen3: "https://api1.qibuluo.net/attachment/images/2/hongpailou.jpg",
        showPickerVisible: false,
        showPickerTimeVisible: false,
        current_order_time: null, // 预约的时间
        current_time: "",
        date: "2019-09-18",
        minHour: 0,
        maxHour: 0,
        minMinute: 0,
        maxMinute: 59,
        minDate: new Date().getTime(),
        maxDate: new Date(new Date().getFullYear(), 11, 31).getTime(),
        currentDate: new Date().getTime(),
        currentTime: "08:00",
        current_order_time_flag: true
    },
    // 选择日期
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
    // 选择时间
    onInputTime(event) {
        this.setData({
            current_time: event.detail
        })
    },
    // 显示时间选择器
    showPicker() {
        this.setData({showPickerVisible: true});
    },
    onClose1() {
        this.setData({showPickerVisible: false});
    },
    onClose2() {
        this.setData({showPickerTimeVisible: false});
    },
    showPickerTime() {
        if (this.data.current_order_time_flag) {
            this.setData({
                showPickerTimeVisible: true
            })
        }
    },
    // 立即预约
    orderNow() {
        const _that = this
        if (!_that.data.currentSeat) {
            wx.showModal({
                title: '提示',
                content: '请选择位置',
                showCancel: false,
            })
            return
        }
        // 开始发送请求
        let access_token = wx.getStorageSync('ACCESS_TOKEN');
        if (!access_token) {
            // 显示获取用户信息
            // app.page.setUserInfoShow()
            // 先验证手机号
            wx.navigateTo({
                url: '/pages/verficity/index?flag2=1'
            })
            return
        }


        // if (!wx.getStorageSync('USER_INFO').binding) {
        //     wx.showModal({
        //       title: '提示',
        //       content: '请验证手机号',
        //       success: res=>{
        //         if (res.confirm) {
        //             wx.navigateTo({
        //               url: '/pages/verficity/index'
        //             })
        //         }
        //       }
        //     })
        //     return
        // }

        // let currentSeatId = .id

        wx.navigateTo({
            url: `/pages/selectOrderTime/selectOrderTime?seatName=${_that.data.currentSeat.seat_name}&seatId=${_that.data.currentSeat.id}&storeName=${_that.data.storeInfo.title}&storeImg=${_that.data.storeInfo.logo}`
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.page.onLoad(this, options)
        // app.page.setUserInfoShow()
        /**
         * 发送请求,参数为门店的id值
         * 获取门店对应的所有位置信息
         */
        if (options.flag && !options.flag) {
            // 显示获取用户信息
            app.page.setUserInfoShow()
        }
        wx.setStorageSync('shop_id_my', options.storeid);
        let date = new Date(new Date().getFullYear())
        let storeid = options.storeid
        let currentShop = null
        const _that = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        app.request({
            url: app.api.common.get_seats,
            data: {
                shop_id: options.storeid
            },
            success: res => {
                let shop_list = wx.getStorageSync('shop_list');
                shop_list.forEach(item => {
                    if (item.id == storeid) {
                        currentShop = item
                    }
                })
                let storeInfo2 = res.data
                storeInfo2.id = storeid
                storeInfo2.title = currentShop.name
                storeInfo2.logo = currentShop.logo
                let tempSeatList = storeInfo2.seatList
                // console.log(tempSeatList)
                for (let key in tempSeatList) {
                    tempSeatList[key].forEach(item => {
                        if (item.status == "0") { // 可选择
                            item.nowSrc = "https://api1.qibuluo.net/attachment/images/2/canSelect.png"
                            // item.nowSrc="https://api1.qibuluo.net/attachment/images/2/canSelect.png"
                        } else if (item.status == "1") { // 已预约
                            item.nowSrc = "https://api1.qibuluo.net/attachment/images/2/orderd.png"
                        } else if (item.status == "2") { // 使用中
                            item.nowSrc = "https://api1.qibuluo.net/attachment/images/2/using.png"
                        }
                    })
                }
                storeInfo2.seatList = tempSeatList

                this.setData({
                    storeInfo: storeInfo2
                })
                wx.hideLoading()
            }
        })
    },

    // 点击位置触发的方法
    clickSeat(event) {
        let clickIndex = event.currentTarget.dataset.index
        let area = event.currentTarget.dataset.area
        let newArray = {}
        newArray = this.data.storeInfo

        // if (!newArray.seatList[`${area}`][clickIndex].flag && this.data.currentSeat) {
        //     wx.showModal({
        //         title: '提示',
        //         content: '只能预约一个位置',
        //         showCancel: false,
        //     })
        //     return
        // }
        // this.setData({
        //     currentSeat: null
        // })
        // newArray.seatList[`${area}`].forEach(item=>{
        //     item.nowSrc = "https://api1.qibuluo.net/attachment/images/2/canSelect.png"
        // }
        let tempCurrent=null
        if (newArray.seatList[`${area}`][clickIndex].flag) {
            // for (let i in newArray.seatList) {
            //     newArray.seatList[i].forEach(item => {
            //         item.nowSrc = "https://api1.qibuluo.net/attachment/images/2/canSelect.png"
            //     })
            // }
            // 取消预约
            newArray.seatList[`${area}`][clickIndex].nowSrc = 'https://api1.qibuluo.net/attachment/images/2/canSelect.png'
            newArray.seatList[`${area}`][clickIndex].flag = false
            this.setData({
                currentSeat: null
            })
        } else {
            for (let i in newArray.seatList) {
                newArray.seatList[i].forEach(item => {
                    if (item.nowSrc!='https://api1.qibuluo.net/attachment/images/2/orderd.png') {
                        item.nowSrc = "https://api1.qibuluo.net/attachment/images/2/canSelect.png"
                        item.flag=false
                    }
                })
            }
            // 预约
            newArray.seatList[`${area}`][clickIndex].nowSrc = 'https://api1.qibuluo.net/attachment/images/2/selected.png'
            newArray.seatList[`${area}`][clickIndex].flag = true
            this.setData({
                currentSeat: newArray.seatList[`${area}`][clickIndex]
            })
        }
        this.setData({
            storeInfo: newArray
        })

        this.loadPicker()

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
                this.setData({
                    minHour: 8,
                    maxHour: 22,
                    minMinute: 0,
                    maxMinute: 59,
                    current_order_time_flag: true
                })
            } else if (currentSelectTime == nowDate && currentSelectMonth == nowMonth) {
                let currentHours = new Date().getHours() + 1 + ":" + "00"
                let currentMinHour = new Date().getHours() + 1
                // let currentMinHour = 5
                let miHoursFlag
                if (currentMinHour < 8) {
                    miHoursFlag = true
                } else if (currentMinHour >= 20) {
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
                    current_order_time_flag: true
                })
                // if (this.data.minHour >= this.data.maxHour) {
                //     this.setData({
                //         current_order_time_flag: false
                //     })
                // }
            }
        }
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
