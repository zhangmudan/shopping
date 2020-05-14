// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateData: [],
    items: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      method: 'GET',
      success: (result) => {
        // console.log(result);
        const cateData = result.data.message
        this.setData({
          cateData,
          items: cateData[0]
        })
      },
    });

  },
  navtap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      items: this.data.cateData[index]
    })

  }


})