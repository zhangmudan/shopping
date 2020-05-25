import axios from '../../request/myAxios'
Page({

  getInfo(e) {
    const { userInfo } = e.detail
    const { iv, rawData, signature, encryptedData } = e.detail
    wx.setStorageSync('userInfo', userInfo);
    wx.login({
      success: (result) => {
        const { code } = result
        axios({
          url: '/users/wxlogin',
          method: "POST",
          data: {
            iv,
            rawData,
            signature,
            encryptedData,
            code
          }
        }).then(res => {
          const { token } = res
          if (!res) {
            wx.showToast({
              title: '信息获取失败,请重新获取',
              icon: 'none'
            });
          } else {
            wx.setStorageSync("token", token);
            //返回上一页面
            wx.navigateBack();

          }

        })
      }
    });



  }
})