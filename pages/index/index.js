Page({
  data: {
    swiperData: [],
    navData: [],
    floorData: []
  },
  onLoad() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: 'GET',
      success: (result) => {
        // console.log(result);
        const swiperData = result.data.message
        this.setData({
          swiperData
        })
      }

    });
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      method: 'GET',
      success: (result) => {
        // console.log(result);
        const navData = result.data.message
        this.setData({
          navData
        })
      },

    });
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      method: 'GET',
      success: (result) => {
        // console.log(result);
        const floorData = result.data.message
        this.floorData = floorData.map((item, index) => {
          item.id = index
          return item
        })
        this.setData({
          floorData
        })
      },
    });



  }

})