// pages/pay/index.js
Page({
  data: {
    addressData: {},
    goods: []
  },
  address_btn() {
    wx.getSetting({
      success: ({ authSetting }) => {
        console.log(authSetting);
        const scopeAddress = authSetting["scope.address"]
        if (scopeAddress === undefined || scopeAddress === true) {
          wx.chooseAddress({
            success: (result) => {
              let start = result.telNumber.slice(0, 4)
              let end = result.telNumber.slice(result.telNumber.length - 3)
              result.telNumber = start + '****' + end
              this.setData({ addressData: result })

            }
          });

        } else {
          wx.openSetting();

        }

      }
    });


  },
  onShow() {
    const goods_item = wx.getStorageSync('cart') || [];
    this.data.goods = goods_item.filter(item => {
      if (item.isSelect === true) {
        return item
      }

    });
    console.log(this.data.goods);
    this.setData({
      goods: this.data.goods
    })

  }

})