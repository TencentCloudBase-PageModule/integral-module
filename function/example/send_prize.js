/**
 * 具体的业务函数，在这里实现你发奖，发积分的逻辑
 * @param { object } params - 业务入参
 * @param { string } params.openId - 当前访问者的微信openId
 * @param  context - 云函数的调用信息和运行状态
 * @returns { object } - 返回参数
 * @returns { number } code 返回的状态标记，成功返回0， 非0代表错误
 * @returns { string } msg 如果成功，则可以不返回，如果失败把相应的错误原因中文描述放在这里
 * @returns {Object} result 出参必须遵循接口定义
 */

const {
  PageModule,
  cloudbase
} = require('@cloudbase/page-module')

const pageModule = new PageModule('integral-center')

exports.main = async function (params, context) {
  let {
    OPENID,
    APPID
  } = cloudbase.getWXContext()
  // ... 调用业务方接口实现该逻辑，例如，调用当前环境下的云函数
  res = await cloudbase.callFunction({
    name: "xxx",
    data: {
      openid: OPENID,
      prizeId: params.prizeId
      // xxx
    }
  })
  return {
    code: 0,
    msg: 'success',
    result: {
      sendResult: true
    }
  }
}