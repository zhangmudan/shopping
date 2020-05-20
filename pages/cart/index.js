// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_item: [],
    selectradio: false,
    selectCount: 0,
    totalPrice: 0

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const goods_item = wx.getStorageSync('cart') || [];
    this.setData({
      goods_item
    })
    this.getStore(this.data.goods_item);
  },
  //数量的加减
  goods_count(e) {
    const { index, num } = e.currentTarget.dataset
    if (num === -1) {
      if (this.data.goods_item[index].count === 1) {
        wx.showModal({
          content: '你确定要删除该商品吗',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: "#eb4450",
          success: ({ confirm }) => {
            if (confirm) {
              this.data.goods_item.splice(index, 1)
              this.getStore(this.data.goods_item);
            }
          },
        });
      } else {
        this.data.goods_item[index].count -= 1
      }
    } else {
      this.data.goods_item[index].count += 1

    }
    this.getStore(this.data.goods_item);
  },
  //单个商品的选择
  select_item(e) {
    const index = e.currentTarget.dataset.index;
    this.data.goods_item[index].isSelect = !this.data.goods_item[index].isSelect;
    this.getStore(this.data.goods_item);

  },
  //封装更新页面数据和仓库数据
  getStore(cart) {
    let selectradio = false,
      selectCount = 0,
      totalPrice = 0
    cart.forEach(item => {
      if (item.isSelect === true) {
        selectCount += 1
        totalPrice += item.goods_price * item.count
        if (selectCount === cart.length) {
          selectradio = true
        }
      }
    })
    this.setData({
      selectradio,
      selectCount,
      totalPrice
    })
    this.setData({
      goods_item: cart,
    })
    wx.setStorageSync("cart", cart);
  },
  //全选按钮
  selectAll() {
    let { goods_item, selectradio } = this.data
    selectradio = !selectradio
    goods_item.forEach(item => {
      item.isSelect = selectradio
    })
    this.setData({ selectradio })
    this.getStore(this.data.goods_item);
  },
  //跳转到支付页面
  goToPay() {
    if (this.data.selectCount === 0) {
      wx.showToast({
        title: '没有需要结算的商品',
        icon: 'none'
      });

    } else {
      wx.navigateTo({
        url: '/pages/pay/index'
      });


    }

  }

})