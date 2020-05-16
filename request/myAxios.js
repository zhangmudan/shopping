//请求基地址
const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
//计数器
let requestCount = 0
//axios 是个函数
const axios = (params) => {
  requestCount++
  wx.showNavigationBarLoading();
  // axios 函数内部返回 promise 对象
  return new Promise((resolve, reject) => {
    //用wx-request() 小程序发送请求
    wx.request({
      //把参数解构
      ...params,
      url: baseUrl + params.url,
      //请求成功的回调函数
      success: (result) => {
        //执行resolve回调函数
        //直接把返回的数据处理,提取出来,作为then 的接收的参数
        if (result.data) {
          resolve(result.data.message)
        } else {
          resolve(result)
        }
      },
      //请求失败
      fail: (error) => {
        wx.showToast({
          title: '数据获取失败',
          icon: 'none',
        });
        //执行reject回调函数
        reject(error)
      },
      //完成,不管成功失败
      complete: () => {
        requestCount--
        if (requestCount === 0) {
          wx.hideNavigationBarLoading();
        }

      }
    });

  })
}

//导出axios函数
export default axios

// axios({
//   url: '',
//   data: {},
//   header: { 'content-type': 'application/json' },
//   method: 'GET',
//   dataType: 'json',
//   responseType: 'text',
// }).then()