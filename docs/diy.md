## 业务系统联动打通
业务系统与模块间进行联调
1. 方式1：业务侧主动调用模块的 [服务端接口](./api.md#服务端接口)
2. 方式2：模块内的自定义接口打到业务模块，例如，积分中心兑换奖品真实的奖品发放会调用业务侧的接口

### 1. `setTaskStatus` 设置用户任务状态
任务完成需要由业务侧进行标记，例如，用户关注了公众号，则按照如下代码进行调用标识任务完成。

```js
    // 在自身业务代码中引入pageModuleSDK方法
const  { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('integral-center');
module.exports = async function demo(params, context) {
    await  pageModule.callMethod('setTaskStatus',{
        taskId, // 任务标识
        openId, // 被操作用户小程序openId
        completeNum, // 进度型任务填写实际进度数量，标准任务固定为1
        status, // 设置当前任务状态(1)待领取(2)未完成(3)已完成   
        })
}
```

### 2.`changePoints` 设置用户积分变动
业务侧可以开发一些新模块，需要加减积分的
1. 积分大转盘，转一次就消耗X积分，可以调用该接口进行积分消耗。
2. 签到打卡，会发放积分到积分中心

```js
// 在自身业务代码中引入pageModuleSDK方法
const  { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('integral-center');
module.exports = async function demo(params, context) {
    await  pageModule.callMethod('changePoints',{
        openId,  // 被操作用户小程序openId
        changeType, // 变动类型(task)任务(exchange)奖励(other)其他(sign)签到(invite)邀请
        id, // 非integral类型下任务或奖励标识
        faceValue, // 增加或消耗的积分数量
        prizeType, // 奖励类型(goods)实物(virtualGoods)虚拟物品(integral)积分；默认积分
        userAddress:{ // 当奖励类型为goods时需要填写用户收货地址信息
            address, // 地址信息
            userName, // 收货人姓名
            telNumber, // 收货人电话
        }
    })
}
```
### 3.`timedTask` 定时任务(每日00:00刷新用户过期积分、任务状态、奖励状态)
当前依赖业务侧主动调用任务刷新接口才会对任务进行刷新，请定时调用该函数。

```js
// 在自身业务代码中引入pageModuleSDK方法 设置每晚定时触发
const  { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('integral-center');
module.exports = async function demo(params, context) {
    await  pageModule.callMethod('timedTask')
}
```

### 4. `send_prize` 发奖接口
兑换虚拟类型的礼物时，兑换接口内会调用`send_prize`接口，该接口可连接到云开发的云函数，业务在云函数内实现发奖逻辑。
