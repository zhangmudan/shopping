import axios from '../../request/myAxios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const goods_id = options.goods_id
    axios({
      url: '/goods/detail',
      data: { goods_id }
    }).then(res => {
      // console.log(res);
      const goodsList = res
      this.setData({
        goodsList
      })
    })
  },
  bigImage(e) {
    const urls = this.data.goodsList.pics.map(item => {
      return item.pics_big
    })
    const current = e.currentTarget.dataset.image
    wx.previewImage({
      urls,
      current
    })
  }


})