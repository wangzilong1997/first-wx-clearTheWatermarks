// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  searchFunc:function(getTarget){
    console.log('666',getTarget)
    let {like,callback} = getTarget.detail
    wx.request({
      url: `https://f.4dbim.vip/precast/api/wechat/welder/search?pid=637&access_token=kxjMrzOahMRy84KSRO-SrPbtFY8djGAvjj99n96C&Like=${like}`,
      success:(res) => {
        console.log('获取数据',res)
        callback(res.data.data.map(item => {
          item.Name = item.MachineID
          return item
        }))
      }
    })
  }
})