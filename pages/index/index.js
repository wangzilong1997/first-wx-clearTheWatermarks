// pages/clear/index.js

let app = getApp()
let { globalData: {
  _targetUrl
}} = app

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入的链接地址
    inputVal:null,
    // 预览的链接地址
    prevVideo:null,
    // 下载的链接地址
    downloadUrl:null,
    // 临时保存的视频路径
    filePath:null,
    // 进度条
    progress:0,
    // 下载按钮
    isCanDownLoad:true
  },
  onLoad(){
    console.log('onload',this)
    console.log('#url',app,app.globalData,_targetUrl)
    
  },
  inputChange(e){
    console.log(e)
    this.setData({ inputVal: e.detail.value })
  },
  tapSure(e){
    console.log(this)
    console.log('tapSure确定按钮执行',this.data.inputVal)
    this.setData({
      isCanDownLoad:true,
      progress:0
    })
    wx.request({
      url: `${_targetUrl}/clearTheWater/getTKUrl/realUrl`,
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        urlStr:this.data.inputVal
      },
      success:(e)=>{
        console.log(e)
        this.setData({
          prevVideo:e.data.stdout,
          downloadUrl:e.data.fileName
        })
        wx.request({
          url: `${_targetUrl}/clearTheWater/getTKUrl/downLoadTK`,
          method:'POST',
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            downLoadUrl:e.data.stdout,
            fileName:e.data.fileName,
            info:this.data.inputVal
          },
          success:r => {
            console.log(r.data.success,e.data.fileName,)
            if(r.data.success){
              const downloadTask =  wx.downloadFile({
                url: `${_targetUrl}/videos/${e.data.fileName}.mp4`,
                // url:r.data.downLoadUrl,
                success: res =>{
                  this.setData({
                    filePath:res.tempFilePath
                  })
                }
              })
              downloadTask.onProgressUpdate((res) => {
                if (res.progress === 100) {
                  this.setData({
                    isCanDownLoad:false,
                    progress: res.progress
                  })
                } else {
                  this.setData({
                    progress: res.progress
                  })
                }
              })
            }
          },
          fail:res => {

          }

        })


      }
    })
  },
  download(e){
    wx.saveVideoToPhotosAlbum({
      filePath: this.data.filePath,
      success: res => {
        wx.showToast({
          title: '已保存到相册啦',
          icon: 'success',
          duration: 2000
        })
        console.log('保存到相册成功',res)
      },
      fail: res => {
        console.log('保存到相册失败',res);
      }
    })  
  }
})