// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_item: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const goods_item = wx.getStorageSync('cart') || [];
    this.setData({
      goods_item
    })
  },
  add_goods(e) {
    const index = e.currentTarget.dataset.index
    this.data.goods_item[index].count += 1
    this.setData({
      goods_item: this.data.goods_item
    })

  },
  reduce_goods(e) {
    const index = e.currentTarget.dataset.index
    const count = e.currentTarget.dataset.count
    if (count === 1) {
      wx.showToast({
        title: '数量不能再减了哦',
        icon: 'none',
      });

    } else {
      this.data.goods_item[index].count -= 1
      this.setData({
        goods_item: this.data.goods_item
      })
    }
  }


})