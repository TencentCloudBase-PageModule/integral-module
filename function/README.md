# 自定义接口说明

该云函数为单页模块的自定义接口示例部署文件。

## 目录说明
```shelll
.
├── README.md
├── api # 存放api实现的文件，文件名对应接口名
│   ├── demo.js # demo示例文件
├── example # 模块给的示例实现，可以接入使用
│   ├── send_prize.js
│   └── send_prize.md
├── index.js # 入口文件
└── package.json # 依赖声明
```

## api 自定义接口列表
可在控制台查阅接口文档
1. `send_prize` 发奖接口

## B端接口列表
接口文档 [接口文档](../docs/apiDocs.md)

1.`setTaskStatus` 设置用户任务状态
```js
    // 在自身业务代码中引入pageModuleSDK方法
const  { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('integral-center');
module.exports = async function demo(params, context) {
    await  pageModule.callMethod('setTaskStatus',{
        taskId, // 任务标识
        openId, // 被操作用户小程序openId
        completeNum, // 进度型任务填写实际进度数量，标准任务固定为1
        status, // 设置当前任务状态(1)待领取(2)已完成(3)未完成    
        })
}
```
2.`changePoints` 设置用户奖励信息

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

3.`timedTask` 定时任务(每日00:00刷新用户过期积分、任务状态、奖励状态)
```js
// 在自身业务代码中引入pageModuleSDK方法 设置每晚定时触发
const  { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('integral-center');
module.exports = async function demo(params, context) {
    await  pageModule.callMethod('timedTask')
}
```
## example 示例实现

1. 发奖 [`send_prize`](./example/send_prize.md) 
## FAQ
### 1. 云函数如何和已有系统打通
云函数内可以通过http接口调用与已有系统打通。
