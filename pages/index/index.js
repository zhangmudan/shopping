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
        //把后端返回的地址替换成项目路径
        navData.forEach(item => {
          if (item.navigator_url) {
            item.navigator_url = item.navigator_url.replace('/main', '/index')
          }

        });
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
        floorData.forEach(v => {
          if (v.product_list.navigator_url) {
            v.product_list.navigator_url = v.product_list.navigator_url.replace('?', '/index?')
          }
        })
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