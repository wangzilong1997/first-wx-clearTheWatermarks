// pages/mybaobao/mybaobao.js

let app = getApp()
let { globalData: {
  _targetUrl
}} = app

Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginTime:'-1',
    intertval:'-1',
    timerShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '请求数据中',
    })
    wx.request({
      url: `${_targetUrl}/wx/bb/getData?openid=${wx.getStorageSync('openid')}`,
      success:(res) => {
        console.log('请求个人数据',res)
        if(res.data.success){
          this.setData({
            beginTime:res.data.data.time,
            intertval:res.data.data.timeInterval,
            timerShow:true,
          })
        }else{
          
        }
        wx.hideLoading({
          success: (res) => {

          },
        })
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  beginTimerChange(e){
    console.log(e)
    this.setData({
      beginTime:e.detail.value
    })
  },
  intervalInput(e){
    console.log(e)
    this.setData({
      intertval:e.detail.value
    })
  },
  submit(){
    if(this.data.beginTime == -1){
      wx.showToast({
        title: '输入开始时间',
      })
      return 
    }
    if(this.data.intertval == -1){
      wx.showToast({
        title: '输入持续时间',
      })
      return 
    }
    let url = `${_targetUrl}/wx/bb/setData?openid=${wx.getStorageSync('openid')}&time=${this.data.beginTime}&timeInterval=${this.data.intertval}`
    wx.request({
      url: url,
    })
  }
})