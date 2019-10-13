// pages/pay/pay.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pay_card_list: [], // 所有充值卡的类型
        totalPrice: 0, // 总价
        activeIndex: 0, // 默认选中的卡片类型
        submitLoading: false,
        inputCount: 1,
        selectTimeVisible: false,
        tempCardPrice: "",
        flag: null,
        payBtnStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let flag = options.flag // 获取用户的字符状态
        this.setData({
            flag: flag
        })
        // wx.login({
        //     success: res=>{
        //         console.log('用户code为: ')
        //         console.log(res.code)
        //         wx.request({
        //             url: 'https://30paotui.com/user/wechat',
        //             data: {
        //                 appid: "wx564f13b6a8a93519",
        //                 secret: '7682d30c6d9426d4e5ff1d244286b958',
        //                 code: res.code
        //             },
        //             success: response=>{
        //                 console.log('id为: ')
        //                 console.log(response)
        //             }
        //         })
        //     }
        // })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        // 请求充值卡的类型
        app.request({
            url: app.api.rechargeOrder.get_recharge_type,
            success: (res) => {
                let tempCard = ""
                res.data.forEach(item => {
                    if (item.id == "5") {
                        tempCard = item.price
                    }
                })
                this.setData({
                    pay_card_list: res.data,
                    totalPrice: Number(res.data[0].price * 100),
                    tempCardPrice: tempCard
                })
                wx.hideLoading();
            }
        })
    },
    // 选择时长
    onChangeStepper({detail}) {
        let newPayList = this.data.pay_card_list
        let currentPrice = Number(this.data.tempCardPrice)
        this.setData({
            inputCount: detail.value,
            totalPrice: currentPrice * detail.value * 100,
        })
        newPayList[this.data.activeIndex].price = (this.data.totalPrice / 100).toFixed(2)
        this.setData({
            pay_card_list: newPayList
        })
    },
    // 支付首次
    pay_now(){
        const _that=this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        _that.setData({
            payBtnStatus: true
        })
        app.request({
            method: 'POST',
            url: app.api.rechargeOrder.order_submit,
            data: {
                type: 4,
            },
            success: res => {
                app.request({
                    method: 'POST',
                    url: app.api.rechargeOrder.pay_data,
                    data: {
                        id: res.data.id
                    },
                    success: response => {
                        wx.requestPayment({
                            'timeStamp': response.data.timeStamp,
                            'nonceStr': response.data.nonceStr,
                            'package': response.data.package,
                            'signType': 'MD5',
                            'paySign': response.data.paySign,
                            'success': function (res2) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '付款成功',
                                    duration: 3500,
                                });
                                setTimeout(() => {
                                    wx.redirectTo({
                                        url: '/pages/index/index'
                                    })
                                }, 1500)
                            },
                            'fail': function (fail) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '付款失败',
                                    duration: 3500,
                                });
                            },
                            "complete": function () {
                                wx.hideLoading()
                                _that.setData({
                                    payBtnStatus: false
                                })
                            }
                        });
                    }
                })

            },
            complete: ()=>{
                wx.hideLoading()
                _that.setData({
                    payBtnStatus: false
                })
            }
        })
    },
    // 提交订单
    onSubmit() {
        // console.log(this.data.pay_card_list[this.data.activeIndex])
        this.setData({
            submitLoading: true
        })
        let hours = ""
        if (this.data.pay_card_list[this.data.activeIndex].id == "5") {
            hours = this.data.inputCount
        }
        const _that = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        app.request({
            method: 'POST',
            url: app.api.rechargeOrder.order_submit,
            data: {
                type: this.data.pay_card_list[this.data.activeIndex].id,
                hours: hours || ""
            },
            success: res => {
                app.request({
                    method: 'POST',
                    url: app.api.rechargeOrder.pay_data,
                    data: {
                        id: res.data.id
                    },
                    success: response => {
                        // console.log(response)
                        wx.requestPayment({
                            'timeStamp': response.data.timeStamp,
                            'nonceStr': response.data.nonceStr,
                            'package': response.data.package,
                            'signType': 'MD5',
                            'paySign': response.data.paySign,
                            'success': function (res2) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '付款成功',
                                    duration: 3500,
                                });
                                // this.setData({
                                //     submitLoading: false
                                // })
                                setTimeout(() => {
                                    wx.redirectTo({
                                        url: '/pages/index/index'
                                    })
                                }, 1500)
                            },
                            'fail': function (fail) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '付款失败',
                                    duration: 3500,
                                });
                            },
                            "complete": function () {
                                _that.setData({
                                    submitLoading: false
                                })
                                wx.hideLoading()
                            }
                        });
                    }
                })
            },
            complete: ()=>{
               wx.hideLoading()
            }
        })

    },
    clickCard(event) {
        let index = event.currentTarget.id
        let currentItem = this.data.pay_card_list[index]
        let bid = event.currentTarget.dataset.bid
        if (bid && bid == 5) {
            this.setData({
                selectTimeVisible: true
            })
        }
        this.setData({
            activeIndex: index,
            totalPrice: Number(currentItem.price * 100)
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
