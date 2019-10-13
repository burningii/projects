var e = getApp();
import http from '../util/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: e.globalData.url,
    bgurl: e.globalData.bgurl,
    formId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    e.util.getUserInfo({
      scuesss: function (rs) {
        console.log(rs);
      }
    });
    
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

  },
  bindGetUserInfo: function (a) {
    console.log(a);
    var t = this;
    var data = {
      code: wx.getStorageSync("code"),
      nickName: a.detail.userInfo.nickName,
      avatar: a.detail.userInfo.avatarUrl,
      gender: a.detail.userInfo.gender,
      formId: this.data.formId
    };
    http.get('setuser', data).then(data => {
      wx.setStorageSync('user', data);
      wx.redirectTo({
        url: "/pages/start/index"
      })
    });

  },
  getFormId: function (e) {
    this.setData({ formId: e.detail.formId });
  }
})