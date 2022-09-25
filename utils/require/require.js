const request = (
  method='GET',
  url,
  data,
  success=(res) => {
  console.log(res)
  },
  fail=() => {

  },complete) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: url,
      method:method,
      data:data,
      success:(res) => {
        success(res)
        resolve(res)
      },
      fail:(res) =>{
        fail(res)
        reject(res)
      },
      complete:(res) => {
        complete(res)
      }
    })
  })

}

export {request}