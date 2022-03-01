const { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('integral-center');
const requestApi = async (methodName, params = {}) => {
  const objInfo = await pageModule.callMethod(methodName, params);
  const { result: { code, data } } = objInfo;
  if (code !== 0) {
    wx.showToast({
      title: '云函数调用出错',
    });
  }
  return data;
};
let tolowerTiem = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exchangeData: [],
    total: 0,
    pageIndex: 1,
    loading: false,
    tip: false,
  },
  // 请求数据
  async getInitData(pIndex) {
    this.setData({
      loading: true
    })
    const {
      exchangeData,
      pageIndex
    } = this.data
    const {
      code,
      result
    } = await requestApi('changeRecord', {
      type: 'exchange',
      pageIndex: pIndex || pageIndex,
    })
    if (code !== 0) {
      return wx.showToast({
        icon: 'error',
        title: '查询列表失败',
      })
    }
    this.setData({
      exchangeData: pIndex ? exchangeData.concat(result.data) : result.data,
      total: result.total,
      pageIndex: pIndex || pageIndex,
      loading: false,
      tip: result.total <= pageIndex * 20 ? true : false
    })
  },
  // 滚动加载
  scrolltolower() {
    const {
      pageIndex,
      total
    } = this.data
    let time = new Date().getTime()
    if ((time - tolowerTiem) > 500) {
      this.triggerEvent('scrolltolower')
    }
    tolowerTiem = time;
    if ((pageIndex * 20) - total <= 0) {
      this.getInitData(pageIndex + 1)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options)
    this.getInitData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})