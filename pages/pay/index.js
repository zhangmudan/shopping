import axios from '../../request/myAxios'
//引入 async await
import regeneratorRuntime from '../../lib/runtime'

Page({
  data: {
    addressData: {},
    goods: [],
    totalPrice: 0,
    selectCount: 0
  },
  goodsList: [],
  //获取授权
  address_btn() {
    wx.getSetting({
      success: ({ authSetting }) => {
        // console.log(authSetting);
        const scopeAddress = authSetting["scope.address"]
        //授权为undefined或者已授权
        if (scopeAddress === undefined || scopeAddress === true) {
          //选择地址
          wx.chooseAddress({
            success: (result) => {
              //处理电话号码
              let start = result.telNumber.slice(0, 4)
              let end = result.telNumber.slice(result.telNumber.length - 3)
              result.telNumber = start + '****' + end
              const addressData = {
                telNumber: result.telNumber,
                userName: result.userName,
                address: result.provinceName + result.cityName + result.countyName + result.detailInfo
              }
              //更新页面数据
              this.setData({ addressData })
              //把数据存储到本地
              wx.setStorageSync('addressData', addressData);
            }
          });

        } else {
          //未授权调用设置引导用户打开授权
          wx.openSetting();

        }

      }
    });


  },
  onShow() {
    //获取本地存储
    const cart = wx.getStorageSync('cart') || [];
    const addressData = wx.getStorageSync('addressData') || [];
    this.setData({ addressData })
    this.data.goods = cart.filter(item => {
      if (item.isSelect === true) {
        return item
      }


    });
    this.setData({
      goods: this.data.goods
    })
    this.getStore(cart)
  },
  //封装更新页面数据和仓库数据
  getStore(cart) {
    let selectCount = 0,
      totalPrice = 0
    cart.forEach(item => {
      if (item.isSelect === true) {
        selectCount += 1
        totalPrice += item.goods_price * item.count
      }
    })
    this.setData({
      cart,
      selectCount,
      totalPrice
    })
    wx.setStorageSync("cart", cart);
  },
  //支付流程
  async toPay() {
    const { addressData } = this.data
    if (!addressData.userName) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      });
      return
    } else {
      try {
        //创建订单
        const { order_number } = await this.getCreatPay()
        //获取支付参数
        const { pay } = await this.getPayInfo(order_number)
        //发起支付
        const { errMsg } = await this.requestPay(pay)
        //查看订单状态
        const res = await this.checkOrder(order_number)
        this.goToOrder()

      } catch (error) {
        wx.showToast({
          title: '支付失败,请重新支付',
          icon: 'none'
        });
      }

    }

  },
  //创建订单
  getCreatPay() {
    this.goodsList = this.data.goods.map(item => {
      return {
        goods_price: item.goods_price,
        goods_number: item.count,
        goods_id: item.goods_id,
      }
    })
    return axios({
      url: '/my/orders/create',
      method: 'POST',
      data: {
        order_price: this.data.totalPrice,
        consignee_addr: this.data.addressData.address,
        goods: this.goodsList
      }

    })
  },
  //获取支付参数
  getPayInfo(order_number) {
    return axios({
      url: '/my/orders/req_unifiedorder',
      method: 'POST',
      data: { order_number }
    })
  },

  //发起支付
  requestPay(pay) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...pay,
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })

    })
  },
  //查看订单状态
  checkOrder(order_number) {
    return axios({
      url: '/my/orders/chkOrder',
      method: 'POST',
      data: {
        order_number
      }
    })
  },
  goToOrder() {
    //获取本地存储
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(item => {
      if (item.isSelect === false) {
        return item
      }
    })
    wx.setStorageSync("cart", cart);
    wx.redirectTo({
      url: '/pages/order/index'
    });




  }
})