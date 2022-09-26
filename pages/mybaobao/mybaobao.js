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
    calendar:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.showLoading({
      title: '请求数据中',
    })
    wx.request({
      url: `${_targetUrl}/wx/bb/getData?openid=${wx.getStorageSync('openid')}`,
      success:(res) => {
        console.log('请求个人数据',res)
        if(res.data.success){
          that.setData({
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
  onShow(){
    setTimeout(() => {
      this.calendarFunc(this)
    },1000)

  },
  calendarFunc(that){
    // 获取日历组件上的 calendar 对象
    // 调用 calendar 对象上的方法
    console.log(that.calendar)

    const toSet = that.dealDateFunc(that.data.beginTime,that.data.intertval)

    that.calendar.setCalendarConfig({
      multi: 'multi',
    });

    // that.calendar.jump()
    that.calendar.setSelectedDays(toSet);
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
  },
  dealDateFunc(date,interval,during = 5){
    let res = []
    let dateTimes = new Date(date)
    let intervalTimes = interval * 1000 * 60 * 60 * 24
    let year = dateTimes.getFullYear()
    console.log('+dateTimes < (new Date(date) + 365 * 1000 * 60 * 60 * 24',+dateTimes < (+new Date(date) + 365 * 1000 * 60 * 60 * 24))
    while(+dateTimes < (+new Date(date) + 365 * 1000 * 60 * 60 * 24 * 10) ){
      for(let i=0;i<during;i++){
        let year = dateTimes.getFullYear()
        let month = dateTimes.getMonth()+1
        let day = dateTimes.getDate()
        res.push({
          year: year,
          month: month,
          date: day
        })
        dateTimes = new Date(+dateTimes + 1000 * 60 * 60 * 24)
      }
      dateTimes = new Date(+dateTimes + (interval - during > 0 ?interval - during :0 ) * 1000 * 60 * 60 * 24)
    }
    return res 
  }
})