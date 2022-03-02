## 表结构
### 用户积分记录表
保存用户积分信息


| 字段      | 描述       | 类型   | 是否必填 | 备注           |
| --------- | ---------- | ------ | -------- | -------------- |
| openId    | 用户openId | string | 是       | 小程序openId   |
| createdAt | 创建时间   | number | 是       | 时间戳         |
| points    | 积分       | number | 是       | 用户总积分记录 |
### 积分变动记录表

保存用户增/减积分记录

| 字段                | 描述             | 类型   | 是否必填 | 备注                                                         |
| ------------------- | ---------------- | ------ | -------- | ------------------------------------------------------------ |
| openId              | 用户openId       | string | 是       | 小程序openId                                                 |
| createdAt           | 获取时间         | number | 是       | 时间戳                                                       |
| expiredTime         | 积分过期时间     | number | 否       | 任务奖励的积分过期时间(1年后);自动计算生成的参数             |
| faceValue           | 积分数量         | number | 是       | 用户获取积分数量                                             |
| changeId            | 任务或奖励标识   | string | 否       | 当前任务或奖励标识                                           |
| changeSource        | 变动来源         | string | 是       | 取值:(task)任务奖励(exchange)兑换奖励(other)其他(expiredTask)过期积分(sign)签到(inviting)邀请 |
| remainingIntegral   | 剩余可用积分     | number | 否       | 任务奖励积分剩余可用积分                                     |
| desc                | 积分变动描述     | string | 否       | 变动描述                                                     |
| changeStatus        | 积分数量变动状态 | number | 是       | 取值:(1)增加(2)减少                                          |
| isExpired           | 积分是否过期     | bool   | 是       | 自动计算生成的参数                                           |
| prizeType           | 奖励类型         | string | 是       | (integral)积分(goods)实物(virtualGoods)虚拟物品              |
| userRemainingPoints | 用户剩余积分     | number | 是       | 用户当前剩余总积分                                           |
| prizeInfo           | 奖励信息         | object | 否       | 当变动信息为exchange时补充奖励信息                           |
| prizeInfo.address   | 用户收货地址     | string | 否       | 用户实物奖品收货地址                                         |
| prizeInfo.userName  | 用户姓名         | string | 否       | 用户收货姓名                                                 |
| prizeInfo. title    | 奖励名称         | string | 否       | 奖励名称                                                     |
| prizeInfo.prizeImg  | 奖励图片         | string | 否       | 奖励图片                                                     |
| taskInfo            | 任务信息         | object | 否       | 变动信息task时补充的任务详情                                 |
| taskInfo.title      | 任务标题         | string | 否       | 任务标题                                                     |


### 3.任务列表
保存在B端添加的任务信息

| 字段              | 描述               | 类型   | 是否必填 | 备注                                                         |
| ----------------- | ------------------ | ------ | -------- | ------------------------------------------------------------ |
| taskId            | 任务标识           | string | 是       | 任务标识                                                     |
| createdAt         | 创建时间           | number | 是       | 时间戳                                                       |
| type              | 任务类型           | string | 是       | 取值:(permanentTask)成长任务(cyclicTask)循环任务             |
| cycle             | 循环周期           | object | 是       |                                                              |
| cycle.title       | 任务标题           | string | 是       | eg:每日任务 \| 每周任务                                      |
| cycle.type        | 循环周期类型       | string | 是       | 每天、每周、每月、每周X、每月X                               |
| cycle.day         | 循环日期           | number | 否       | 取值：每周(1-7)每月(1-31)填写；若当月没有这天则为次月1日刷新 |
| title             | 名称               | string | 是       | 展示的任务名称                                               |
| desc              | 描述               | string | 否       |                                                              |
| taskInfo          | 任务详情           | object | 是       | 任务详情                                                     |
| taskInfo.btnTitle | 按钮文字           | string | 否       | 按钮展示文字                                                 |
| taskInfo.btnType  | 按钮类型           | string | 是       | 取值：(route)跳转页面(qrCode)弹出二维码(customize)自定义     |
| taskInfo.path     | 跳转路径           | string | 否       | 点击按钮跳转路径                                             |
| taskInfo.imgUrl   | 弹出图片地址       | string | 否       | 弹出图片地址没有为空                                         |
| faceValue         | 积分奖励数量       | number | 是       | 每个任务的积分奖励数量                                       |
| total             | 任务需要达成总数量 | number | 是       | 任务完成标准eg:充值500元 total=500                           |
| taskModel         | 任务模式           | string | 是       | (standard)标准任务(progress)进度型任务                       |

#### 4.礼品列表
保存在B端添加的奖励

| 字段           | 描述         | 类型   | 是否必填 | 备注                                              |
| -------------- | ------------ | ------ | -------- | ------------------------------------------------- |
| createdAt      | 创建时间     | number | 是       | 时间戳                                            |
| prizeId        | 礼品标识     | string | 是       |                                                   |
| faceValue      | 消耗积分数量 | number | 是       | 需要消耗的积分数量                                |
| title          | 礼品名称     | string | 是       | 奖励名称                                          |
| desc           | 礼品描述     | string | 是       | 奖励描述                                          |
| icon           | 礼品图标     | string | 是       | 奖励图标地址                                      |
| total          | 总数量       | number | 是       | 奖励总数量                                        |
| totalRemaining | 礼品剩余数量 | number | 是       | 礼品剩余数量                                      |
| type           | 奖品类型     | string | 是       | 取值：(goods)实物(virtualGoods)虚拟物品           |
| exchangeLimit  | 兑换限制     | string | 是       | 取值：(day)每天(week)每周(month)每月(once)仅限1次 |



### 5.积分规则表

- 记录积分中心积分规则

| 字段       | 描述     | 类型   | 是否必填 | 备注     |
| ---------- | -------- | ------ | -------- | -------- |
| createdAt  | 创建时间 | number | 是       | 时间戳   |
| ruleDetail | 积分规则 | string | 是       | 积分规则 |

### 6.用户任务状态表

- 用于记录用户任务状态
- B端改变用户任务状态后记录
- 用户C端触发完成/领取任务后记录
- 定时任务会更新循环任务状态



| 字段        | 描述         | 类型   | 是否必填 | 备注                             |
| ----------- | ------------ | ------ | -------- | -------------------------------- |
| openId      | 用户openId   | string | 是       | 小程序openId                     |
| taskId      | 任务标识     | string | 是       | 任务标识                         |
| status      | 任务状态     | number | 是       | 取值:(0)待领取(1)未完成(2)已完成 |
| faceValue   | 积分数量     | number | 是       | 奖励积分数量                     |
| completeNum | 任务完成进度 | number | 是       | 任务累计完成进度                 |
| taskLimit   | 循环条件     | string | 是       | 循环条件                         |

### 7.用户奖励兑换信息表

- 保存用户每次兑换奖励信息
- 一条记录一直记录对应一个用户的一个奖励
- 定时任务会刷新奖励状态
- 根据updatedAt来判断是否当天兑换



| 字段          | 描述         | 类型   | 是否必填 | 备注                    |
| ------------- | ------------ | ------ | -------- | ----------------------- |
| openId        | 用户openId   | string | 是       | 小程序openId            |
| createdAt     | 兑换时间     | number | 是       | 兑换时间                |
| updatedAt     | 最新兑换时间 | number | 是       | 最新兑换时间            |
| prizeId       | 奖励标识     | string | 是       | 奖励标识                |
| status        | 奖励状态     | number | 是       | 取值:(0)可兑换(1)已兑完 |
| faceValue     | 积分数量     | number | 是       | 奖励扣减积分数量        |
| exchangeLimit | 奖励限制     | string | 是       | 奖励限制                |

