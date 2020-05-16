import axios from '../../request/myAxios'
Page({
  data: {
    swiperData: [],
    navData: [],
    floorData: []
  },
  onLoad() {
    axios({ url: '/home/swiperdata' }).then(res => {
      const swiperData = res
      this.setData({
        swiperData
      })
    })
    axios({ url: '/home/catitems' }).then(res => {
      const navData = res
      //     //把后端返回的地址替换成项目路径
      navData.forEach(item => {
        if (item.navigator_url) {
          item.navigator_url = item.navigator_url.replace('/main', '/index')
        }

      });
      this.setData({
        navData
      })
    })
    axios({ url: '/home/floordata' }).then(res => {
      const floorData = res
      this.floorData = floorData.map((item, index) => {
        item.id = index
        if (item.product_list) {
          item.product_list.forEach(v => {
            if (v.navigator_url) {
              v.navigator_url = v.navigator_url.replace('?', '/index?')
            }
          })
        }
        return item
      })
      this.setData({
        floorData
      })
    })


    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   success: (result) => {
    //     // console.log(result);
    //     const swiperData = result.data.message
    //     this.setData({
    //       swiperData
    //     })
    //   }

    // });
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    //   method: 'GET',
    //   success: (result) => {
    //     // console.log(result);
    //     const navData = result.data.message
    //     //把后端返回的地址替换成项目路径
    //     navData.forEach(item => {
    //       if (item.navigator_url) {
    //         item.navigator_url = item.navigator_url.replace('/main', '/index')
    //       }

    //     });
    //     this.setData({
    //       navData
    //     })
    //   },

    // });
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
    //   method: 'GET',
    //   success: (result) => {
    //     // console.log(result);
    //     const floorData = result.data.message
    //     this.floorData = floorData.map((item, index) => {
    //       item.id = index
    //       if (item.product_list) {
    //         item.product_list.forEach(v => {
    //           if (v.navigator_url) {
    //             v.navigator_url = v.navigator_url.replace('?', '/index?')
    //           }
    //         })
    //       }
    //       return item
    //     })
    //     this.setData({
    //       floorData
    //     })
    //   },
    // });



  }

})