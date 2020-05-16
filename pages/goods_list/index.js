import axios from '../../request/myAxios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["综合", "销量", "价格"],
    navindex: 0,
    goodsList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    axios({ url: '/goods/search', data: { cid: 5 } }).then(res => {
      // console.log(res);
      const goodsList = res
      this.setData({
        goodsList
      })
    })
  },
  // 点击获取数据
  navIndex(e) {
    const index = e.currentTarget.dataset.nav;
    this.setData({
      navindex: index
    })
  }
})