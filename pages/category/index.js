import axios from '../../request/myAxios'
// pages/category/index.js
Page({
  // 页面的初始数据

  data: {
    //左侧
    cateData: [],
    activeIndex: 0,
    //右侧
    cateRight: [],
    //右侧滚动归零
    scropTop: 0
  },
  cateAll: [],
  //请求数据
  getCateData() {
    axios({
      url: '/categories',
    }).then(res => {
      this.cateAll = res
      // console.log(this.cateAll);
      this.getMap()
      //数据获取成功后,把数据保存到本地存储
      //因为本地存储属于永久存储,保存是添加一个时间戳
      //时间戳用于对比下次打开当前页面的时间,如果超过某个时间范围,那么重新请求
      wx.setStorageSync('cateAll', {
        time: Date.now(),
        data: this.cateAll
      });
    })
  },
  //处理数据
  getMap() {
    const cateData = this.cateAll.map(item => {
      return {
        cat_id: item.cat_id,
        cat_name: item.cat_name
      }
    })
    const cateRight = this.cateAll[0].children
    //更新页面数据
    this.setData({
      cateData,
      cateRight,
    })
  },


  // 生命周期函数--监听页面加载   
  onLoad(options) {
    //获取本地存储数据
    const cateAll = wx.getStorageSync('cateAll');
    if (!cateAll) {
      this.getCateData()
    } else if (Date.now() - cateAll.time > 5 * 60 * 1000) {
      // console.log('超过5分钟');
      this.getCateData()
    } else {
      // console.log('未超过5分钟');
      this.cateAll = cateAll.data
      this.getMap()

    }
  },
  // 点击获取数据
  navtap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      cateRight: this.cateAll[index].children,
      //右侧滚动归零
      scropTop: 0
    })

  }


})