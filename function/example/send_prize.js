const objCloud = require('wx-server-sdk');
module.exports = async function sendPrize(params, context){
  // 入参
  const { openId = ''} = params;
  // 当前环境信息
  const { ENV } = objCloud.getWXContext();
  try {
    // 发奖业务逻辑

  } catch (error) {
    console.log('错误信息返回', {
      code: error.iCode || 10000,
      msg: error.iCode && error.iCode !== 10000 ? error.message : `服务内部错误: ${error.message}`,
      result: {},
    });
  }
};
