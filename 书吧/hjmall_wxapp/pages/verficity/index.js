const app = getApp()
import Notify from '../../vant/notify/notify';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNumber: '', // 手机号
        verifyCode: '',
        verfiBtnDisable: false, //按钮是否禁用
        verfiTxt: '获取验证码',
        storeID: ''
    },

    // 点击确定按钮
    checkCode() {
        const _that = this
        const regexPhone = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
        const phone = _that.data.phoneNumber
        const verify = _that.data.verifyCode
        if (!regexPhone.test(phone)) {
            wx.showToast({
                title: '手机号格式不正确',
                icon: 'none',
                duration: 1500
            })
            return
        }

        if (_that.data.verifyCode == '') {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 1500
            })
            return
        }
        app.request({
            method: 'GET',
            url: app.api.default.check_sms,
            data: {
                mobile: phone,
                code: _that.data.verifyCode
            },
            success: res => {
                if (res.data.status == '1') {
                    wx.showModal({
                        title: '提示',
                        content: '验证成功',
                        showCancel: false,
                        success: res2 => {
                            wx.setStorageSync('user_phone', phone);
                            if (_that.data.flag2==1){
                                wx.setStorageSync('showuserInfoFlag', 1);
                            }
                            app.page.setUserInfoShow()
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '验证失败,请重试',
                        showCancel: false
                    })
                }
            },
            complete: () => {
                wx.hideLoading()
            }
        })

    },


    // 获取验证码
    getCode() {
        const _that = this
        const regexPhone = /^\d{11}$/
        const phone = _that.data.phoneNumber
        if (!regexPhone.test(phone)) {
            wx.showToast({
                title: '手机号格式不正确',
                icon: 'none',
                duration: 1500
            })
            return
        }

        // 发送请求, 带上手机号
        // 请求成功
        let count = 60
        var InterVal = setInterval(() => {
            // console.log('我在执行')
            if (count < 1) {
                _that.setData({
                    verfiTxt: '获取验证码',
                    verfiBtnDisable: false
                })
                clearInterval(InterVal)
            } else {
                count--
                _that.setData({
                    verfiBtnDisable: true,
                    verfiTxt: `${count}s`
                })
            }
        }, 1000)
        wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 2000
        })
        app.request({
            method: 'GET',
            url: app.api.default.sms,
            data: {
                mobile: phone
            },
            success: res => {
                if (res.data.code == '0') {
                    wx.showModal({
                        title: '提示',
                        content: '验证码发送成功',
                        showCancel: false
                    })
                }
            }
        })

    },

    phoneEvent(event) {
        this.setData({
            phoneNumber: event.detail
        })
    },
    vericyCodeEvent(event) {
        this.setData({
            verifyCode: event.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('验证页面他妈的执行了')
        app.page.onLoad(this, options)
        if (options.storeid) {
            this.setData({
                storeID: options.storeid
            })
        } else if (options.flag2) {
            this.setData({
                flag2: options.flag2
            })
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
