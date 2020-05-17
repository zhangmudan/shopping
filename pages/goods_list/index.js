import axios from '../../request/myAxios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["综合", "销量", "价格"],
    navindex: 0,//tab栏切换
    goodsList: [],//商品数据

  },

  //请求参数
  params: {
    query: '',//关键字
    cid: '',//商品id
    pagenum: 1,//页码
    pagesize: 10//页容量
  },

  totalCount: 0,//总条数

  //请求数据
  getGoodsList() {
    return axios({ url: '/goods/search', data: this.params }).then(res => {
      // console.log(res);
      //总条数
      this.totalCount = res.total
      //页面数据
      this.setData({
        //分页时数据连接 把原本的数据解构,把返回的数据也解构,拼接成一个数据
        goodsList: [...this.data.goodsList, ...res.goods]
      })

    })
  },
  //  生命周期函数--监听页面加载
  onLoad(options) {
    this.params.cid = options.cid || ""
    this.params.query = options.query || ""
    this.getGoodsList()
  },
  // 点击获取数据
  navIndex(e) {
    const index = e.currentTarget.dataset.nav;
    this.setData({
      navindex: index
    })
  },
  //触底刷新请求数据
  onReachBottom() {
    //Math.ceil(总条数/页容量) 计算页码 
    if (Math.ceil(this.totalCount / this.params.pagesize) > this.params.pagenum) {
      //页面累加
      this.params.pagenum++;
      this.getGoodsList()
    } else {
      wx.showToast({ title: '我也是有底线的', icon: 'none' });

    }

  },
  //页面下拉刷新事件
  async onPullDownRefresh() {
    //页面数据
    this.setData({
      //清空数据
      goodsList: []
    })
    //回到第一页
    this.params.pagenum = 1;
    //重新请求数据
    // 异步变同步
    await this.getGoodsList()
    //停止上拉刷新
    wx.stopPullDownRefresh()
  }
})