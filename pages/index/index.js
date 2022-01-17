// pages/clear/index.js
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
    progress:0,
  },
  onLoad(){
    console.log('onload',this)
  },
  inputChange(e){
    console.log(e)
    this.setData({ inputVal: e.detail.value })
  },
  tapSure(e){
    console.log(this)
    console.log('tapSure确定按钮执行',this.data.inputVal)
    wx.request({
      url: 'https://www.guofudiyiqianduan.com/clearTheWater/getTKUrl/realUrl',
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
          url: 'https://www.guofudiyiqianduan.com/clearTheWater/getTKUrl/downLoadTK',
          method:'POST',
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            downLoadUrl:e.data.stdout,
            fileName:e.data.fileName
          },
          success:r => {
            console.log(r.data.success,e.data.fileName,)
            if(r.data.success){
              const downloadTask =  wx.downloadFile({
                url: "https://www.guofudiyiqianduan.com/videos/"+ e.data.fileName+ ".mp4",
                success: res =>{
                  this.setData({
                    filePath:res.tempFilePath
                  })
                }
              })
              downloadTask.onProgressUpdate((res) => {
                if (res.progress === 100) {
                  this.setData({
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