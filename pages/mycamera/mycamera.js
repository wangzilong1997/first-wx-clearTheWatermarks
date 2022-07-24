// pages/mycamera/mycamera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // var vm = this
    // vm.myCamera = vm.selectComponent("#myCamera")
    // vm.myCamera.takePhoto({
    //   canTime:true,
    //   // 开始之前的函数
    //   brforeCreate:() => {
    //     console.log(`%chello brforeCreate`,'color: red')
    //   },
    //   // 成功的回调函数
    //   success:(e) => {
    //     console.log(`%c父组件回调函数`,'color: green',e)
    //     if(e.success){
    //       console.log(e)
    //     }
    //   },
    //   // 每次结束之后都会执行的函数
    //   complete:(e) => {
    //     console.log(`%cfinal`,'color: blue',e)
    //     // vm.setData({
    //     //   textareaplacehoder:'world'
    //     // })
    //   }
    // })
  },
  takePhoto:function(){
    // this.setDate()
    var vm = this
    var that = this
    vm.myCamera = vm.selectComponent("#myCamera")
    vm.myCamera.takePhoto({
      canTime:true,
      // 开始之前的函数
      brforeCreate:() => {
        console.log(`%chello brforeCreate`,'color: red')
      },
      // 成功的回调函数
      success:(e) => {
        console.log(`%c父组件回调函数`,'color: green',e)
        if(e.success){
          console.log(that,e)
          that.setData({
            pic:e.picturePath[0]
          })
        }
      },
      // 每次结束之后都会执行的函数
      complete:(e) => {
        console.log(`%cfinal`,'color: blue',e)
        // vm.setData({
        //   textareaplacehoder:'world'
        // })
      }
    })
  },
  savePhoto:function(){
    wx.saveImageToPhotosAlbum({
      filePath:this.data.pic
    })
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