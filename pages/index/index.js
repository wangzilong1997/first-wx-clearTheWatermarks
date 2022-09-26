// pages/index/index.js
let app = getApp()
let { globalData: {
  _targetUrl
}} = app

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `${_targetUrl}/wx/login`,
            data: {
              code: res.code
            },
            success:(res) => {
              console.log(res)
              if(res.data.success){
                wx.setStorageSync('openid', res.data.data.openid)
                wx.setStorageSync('session_key', res.data.data.session_key)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          wx.showToast({
            title:`登陆失败！${res.errMsg}`
          })
        }
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

  },
  goWaterMark:()=>{
    wx.navigateTo({
      url: '../watermark/watermark',
    })
  },
  goMyCamera:()=> {
    wx.navigateTo({
      url: '../mycamera/mycamera',
    })
  },
  goSelect:() => {
    wx.navigateTo({
      url: '../select/select',
    })
  },
  goMybaobao:() =>{
    wx.navigateTo({
      url: '../mybaobao/mybaobao',
    })
  }
})