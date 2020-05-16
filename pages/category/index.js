import axios from '../../request/myAxios'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧
    cateData: [],
    activeIndex: 0,
    //右侧
    cateRight: []
  },
  cateAll: [],
  getCateData() {
    axios({
      url: '/categories',
    }).then(res => {
      this.cateAll = res
      // console.log(this.cateAll);
      const cateData = this.cateAll.map(item => {
        return {
          cat_id: item.cat_id,
          cat_name: item.cat_name
        }
      })
      const cateRight = this.cateAll[0].children

      this.setData({
        cateData,
        cateRight,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCateData()


  },
  navtap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      cateRight: this.cateAll[index].children
    })

  }


})