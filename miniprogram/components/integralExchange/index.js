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
Component({
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
  methods: {
    // 滚动加载
    async scrolltolower() {
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
        await this.getInitData(pageIndex + 1)
      }
    },
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
    }
  },
  lifetimes: {
    async attached() {
      // 请求数据
      await this.getInitData();

    },
  }

})