import axios from '../../request/myAxios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {}
  },
  goods_cart: {},
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
      let goodsList = res
      goodsList.goods_introduce = goodsList.goods_introduce.replace(/<img/g, '<img class="my_img"')
      //获取系统信息
      const { system } = wx.getSystemInfoSync()
      if (system.toLocaleLowerCase().indexOf('ios') > -1) {
        //ios 平台把html 字符串中的 .webp 图片替换成 .jpg
        goodsList.goods_introduce = goodsList.goods_introduce.replace(/.webp/g, '.jpg')
      }
      this.setData({
        goodsList
      })
      this.goods_cart = {
        goods_id: res.goods_id,
        goods_small_logo: res.goods_small_logo,
        goods_name: res.goods_name,
        goods_price: res.goods_price
      }
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
  },
  //跳转到购物车
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/index'
    });
  },
  //加入购物车
  addCart() {
    //小程序端的本地存储能存储任意类型数据
    const cart = wx.getStorageSync('cart') || [];
    //获取商品在购物车的索引
    const index = cart.findIndex(item => item.goods_id == this.goods_cart.goods_id)
    //首次加入购物车
    if (index === -1) {
      this.goods_cart.isSelect = true
      this.goods_cart.count = 1
      cart.unshift(this.goods_cart)
    } else {
      //购物车已有商品
      cart[index].count++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'none',
      duration: 1000,
      mask: true,
    });
  },
  //立即购买
  buyNow() {
    wx.showToast({
      title: '功能正在完整,请耐心等待',
      icon: 'none'

    });

  },


})