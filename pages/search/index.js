import axios from '../../request/myAxios'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  query: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputValue(e) {
    this.query = e.detail.value
  },
  searchList() {
    axios({
      url: '/goods/qsearch',
      data: this.query
    }).then(res => {
      console.log(res);

    })
  }


})