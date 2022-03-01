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
Component({
  /**
   * 页面的初始数据
   */
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  },
  properties: {
    isSignModule: {
      type: Boolean,
      value: false
    },
  },
  data: {
    addressInfo: {},
    // 积分banner
    integralNum: 0,
    integralTimeLimit: '积分获取后12个自然月到期，记得及时使用~', // 200积分将于2021-03-31过期
    tabsData: [{
      tabsIcon: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-portal/widget/miniprogram/images/integral-exchange.svg',
      tabsTitle: '兑换记录',
      tabsJumpUrl: '../../components/integralExchange/index'
    },
    {
      tabsIcon: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-portal/widget/miniprogram/images/integral-exchange.svg',
      tabsTitle: '积分明细',
      tabsJumpUrl: '../../components/integralDetalis/index'
    }
    ],
    signUpModel: false, //签到模块
    hasSignUp: 'true',
    doTask: [],
    halfDialog: false,
    prizeRule: '',
    exchangeList: [],
    dialogShow: false,
    dialogUrl: '',
    exchangeCardAllContent: false,
    dotaskCardAllContent: false,
  },
  methods: {
    handleClickRule() {
      this.setData({
        halfDialog: true
      })
    },
    doCloseHalfDialog() {
      this.setData({
        halfDialog: false
      })
    },
    // 关闭弹窗
    doCloseDialog() {
      this.setData({
        dialogShow: false
      })
    },
    // 展开收起切换
    handleexchangeToggleShow() {
      this.setData({
        exchangeCardAllContent: !this.data.exchangeCardAllContent
      })
    },
    handleDotaskToggleShow() {
      this.setData({
        dotaskCardAllContent: !this.data.dotaskCardAllContent
      })
    },


    // 积分不足提醒
    notPoints() {
      wx.showToast({
        icon: 'none',
        title: `积分不足`,
      })
    },
    // 添加邮寄地址
    async choseAddress(id) {
      const that = this;
      wx.chooseAddress({
        success(res) {
        },
        async complete(end) {
          if (end.errMsg === 'chooseAddress:ok') {
            let addressInfo = end;
            delete addressInfo.errMsg
            that.setData({
              addressInfo: {
                addressInfo,
                id
              }
            })
            return true;
          }
        },
        fail(err) {
          wx.showToast({
            title: `填写邮寄地址失败`,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
      })
    },
    // 待领取任务
    async handleExchangeTask(e) {
      const {
        taskid
      } = e.currentTarget.dataset
      wx.showLoading();
      const {
        code,
        result,
        msg
      } = await requestApi('receiveTaskAward', {
        taskId: taskid
      })
      if (code !== 0) {
        wx.hideLoading();
        return wx.showToast({
          icon: 'error',
          title: '领取失败',

        })
      }
      const taskResult = await requestApi('getTaskList')
      this.setData({
        integralNum: result.points,
        doTask: taskResult.result,
      })
      wx.hideLoading();
      return wx.showToast({
        icon: 'success',
        title: '领取成功',
      })
    },
    // 自定义任务事件
    async customize(taskInfo) {
      const { title, taskId, icon, faceValue, total } = taskInfo;
      this.triggerEvent('customize', { title, taskId, icon, faceValue, total })

    },
    // 自定义任务
    async handleExchangeCustom(e) {
      const {
        task
      } = e.currentTarget.dataset
      const {
        btnType,
        path,
        imgUrl,
      } = task.taskInfo
      if (btnType === 'qrCode') {
        this.setData({
          dialogShow: true,
          dialogUrl: imgUrl
        })
      }
      if (btnType === 'route') {
        wx.navigateTo({
          url: `..${path}?id=${task.taskId}`
        })
      }
      if (btnType === 'customize') {
        this.customize(task)
      }
    },
    // 立即兑换
    async doExchangeprize(e) {
      const {
        _id,
        status,
        exchangeLimit,
        totalRemaining,
        prizeId,
        type
      } = e.currentTarget.dataset.exchange;
      const limit = {
        'day': '每日',
        'week': '每周',
        'month': '每月',
        'once': ''
      }
      if (status !== 0) {
        return wx.showToast({
          icon: 'none',
          title: `该礼品${limit[exchangeLimit] || ''}仅限兑换1次`,
        })
      }
      if (totalRemaining <= 0 || !totalRemaining) {
        return wx.showToast({
          icon: 'none',
          title: `该礼品已被兑完`,
        })
      }
      if (type === 'goods') {
        const that = this;
        wx.showModal({
          title: '提示',
          content: '是否前往填写邮寄地址',
          async success(res) {
            if (res.confirm) {
              wx.chooseAddress({
                success(res) {
                },
                async complete(end) {
                  if (end.errMsg === 'chooseAddress:ok') {
                    let addressInfo = end;
                    delete addressInfo.errMsg
                    const { cityName, countyName, detailInfo, provinceName, telNumber, userName, postalCode } = addressInfo;
                    const currentAddress = `${provinceName}${cityName}${countyName}${detailInfo}`
                    const {
                      code,
                      result,
                      msg
                    } = await requestApi('exchangePrize', {
                      id: _id,
                      address: currentAddress,
                      userName,
                      telNumber,
                      postalCode
                    });
                    console.log('doExchangeprize====>', code, result);
                    if (code !== 0) {
                      if (code === 300013) {
                        return wx.showToast({
                          icon: 'none',
                          title: '积分不足'
                        })
                      }
                      return wx.showToast({
                        icon: 'none',
                        title: msg,

                      })
                    }
                    wx.showToast({
                      icon: 'success',
                      title: '兑换成功',
                    })
                    const exchangeResult = await requestApi('getPrizedsList')
                    const pointResult = await requestApi('getUserPoints')
                    this.setData({
                      integralNum: pointResult.result.points,
                      exchangeList: exchangeResult.result
                    })
                  }
                },
                fail(err) {
                  wx.showToast({
                    title: `填写邮寄地址失败`,
                    icon: 'none',
                    duration: 2000
                  })
                  return false;
                }
              })
            } else if (res.cancel) {
              return
            }
          }
        })
      } else {
        const {
          code,
          result,
          msg
        } = await requestApi('exchangePrize', {
          id: _id,
          userName: 'null'
        });
        console.log('doExchangeprize====>', code, result);
        if (code !== 0) {
          if (code === 300013) {
            return wx.showToast({
              icon: 'none',
              title: '积分不足'
            })
          }
          return wx.showToast({
            icon: 'none',
            title: msg,

          })
        }
        wx.showToast({
          icon: 'success',
          title: '兑换成功',
        })
        const exchangeResult = await requestApi('getPrizedsList')
        const pointResult = await requestApi('getUserPoints')
        this.setData({
          integralNum: pointResult.result.points,
          exchangeList: exchangeResult.result
        })

      }


    },
  },
  lifetimes: {
    async attached() {

      const pointResult = await requestApi('getUserPoints')
      const ruleResult = await requestApi('getRule')
      const taskResult = await requestApi('getTaskList')
      const exchangeResult = await requestApi('getPrizedsList')
      this.setData({
        integralNum: pointResult.result.points,
        integralTimeLimit: pointResult.result.expiredPointsInfo ? `${pointResult.result.expiredPointsInfo.faceValue || 0}积分将于${pointResult.result.expiredPointsInfo.expiredTime}过期` : '积分获取后12个自然月到期，记得及时使用~',
        prizeRule: ruleResult.result,
        doTask: taskResult.result,
        exchangeList: exchangeResult.result,
        signUpModel: this.properties.isSignModule,
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

});