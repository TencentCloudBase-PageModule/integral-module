## **积分中心API**
### C端接口

**接口出参均为以下格式，出参结果均在result内**
| result | string / object / array | 返回结果 |
| ------ | ----------------------- | -------- |
| msg    | string                  | 返回信息 |
| code   | number                  | 状态码   |

#### **1.查询当前用户积分信息(getUserPoints)**

- 查询用户积分信息

出参



| points                        | number | 总积分           |
| ----------------------------- | ------ | ---------------- |
| expiredPointsInfo             | object | 过期积分详情     |
| expiredPointsInfo.faceValue   | number | 最近到期积分数量 |
| expiredPointsInfo.expiredTime | string | 到期时间         |


#### **2.查询当前用户兑换记录 / 积分明细(changeRecord)**

- 根据传入参数来返回兑换记录 / 积分明细

入参



| type | string | 类型eg:(task)积分明细(exchange)兑换记录 |
| ---- | ------ | --------------------------------------- |



出参



| desc                | string | 变动描述               |
| ------------------- | ------ | ---------------------- |
| type                | string | 类型                   |
| createdAt           | string | 创建时间               |
| faceValue           | number | 变动积分               |
| changeStatus        | number | 变动状态(1)增加(2)减少 |
| userRemainingPoints | number | 用户剩余积分数量       |





#### **3.获取当前兑换奖励列表(getPrizedsList)**

- 根据当前用户兑换情况获取奖励列表
- 已兑换or数量不足展示在最后面



出参



| title          | string | 奖励名称             |
| -------------- | ------ | -------------------- |
| desc           | string | 奖励描述             |
| faceValue      | number | 积分数量             |
| totalRemaining | number | 剩余数量             |
| icon           | string | 奖品icon             |
| exchangeLimit  | string | 兑换限制             |
| status         | number | (0)可以兑换(1)已兑换 |





#### **4.获取当前任务列表(getTasksList)**

- 获取当前用户任务列表

出参



| permanentTask                | array<object> | 成长任务         |
| ---------------------------- | ------------- | ---------------- |
| permanentTask[].taskId       | string        | 任务标识         |
| permanentTask[].title        | string        | 任务名称         |
| permanentTask[].desc         | string        | 任务描述         |
| permanentTask[].btnTitle     | string        | 按钮文字         |
| permanentTask[].btnType      | string        | 按钮类型         |
| permanentTask[].path         | string        | 跳转路径         |
| permanentTask[].imgUrl       | string        | 二维码地址       |
| permanentTask[].faceValue    | number        | 积分数量         |
| permanentTask[].total        | number        | 可以完成的总数量 |
| permanentTask[].currentTotal | number        | 当前完成总数量   |
| cyclicTask                   | array<object> | 循环任务         |
| cyclicTask[].taskId          | string        | 任务标识         |
| cyclicTask[].title           | string        | 任务名称         |
| cyclicTask[].desc            | string        | 任务描述         |
| cyclicTask[].btnTitle        | string        | 按钮文字         |
| cyclicTask[].btnType         | string        | 按钮类型         |
| cyclicTask[].path            | string        | 跳转路径         |
| cyclicTask[].imgUrl          | string        | 二维码地址       |
| cyclicTask[].faceValue       | number        | 积分数量         |
| cyclicTask[].total           | number        | 可以完成的总数量 |
| cyclicTask[].currentTotal    | number        | 当前完成总数量   |
| cyclicTask[].cycle           | object        | 循环周期         |





#### **5.获取积分规则(getPointsRule)**

- 获取积分规则

入参

出参



| ruleDetail | string | 积分规则 |
| ---------- | ------ | -------- |





#### **6.兑换奖励(exchangePrize)**

- 验证规则后兑换奖励

入参



| prizeId   | string | 奖励标识 |
| --------- | ------ | -------- |
| address   | string | 邮寄地址 |
| userName  | string | 用户姓名 |
| telNumber | string | 联系电话 |



出参



| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |





#### 7.**领取任务奖励(receiveTaskAward)**

- 完成任务后领取奖励

入参



| taskId | string | 任务标识 |
| ------ | ------ | -------- |



出参



| msg    | string  | 返回信息 |
| ------ | ------- | -------- |
| code   | number  | 状态码   |
| result | Boolean | 返回结果 |



### 服务端接口

#### **1.添加积分规则(savePointsRule)**

入参

| ruleDetail | string | 积分规则 |
| ---------- | ------ | -------- |



出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |





#### **2.添加任务(saveTask)**

入参

| taskId     | 任务标识           | string |
| ---------- | ------------------ | ------ |
| type       | 任务类型           | string |
| cycle      | 循环周期           | object |
| cycle.type | 循环周期类型       | string |
| cycle.day  | 循环日期           | number |
| title      | 名称               | string |
| desc       | 描述               | string |
| btnTitle   | 按钮文字           | string |
| btnType    | 按钮类型           | string |
| path       | 跳转路径           | string |
| imgUrl     | 弹出图片地址       | string |
| faceValue  | 积分数量           | number |
| total      | 任务需要达成总数量 | number |



出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |





#### 3.**添加兑换奖励(savePrize)**

入参

| faceValue     | number | 需要消耗积分数量 |
| ------------- | ------ | ---------------- |
| title         | string | 奖励名称         |
| desc          | string | 奖励描述         |
| icon          | string | 奖励图标         |
| total         | number | 总数量           |
| type          | string | 奖品类型         |
| exchangeLimit | string | 兑换限制         |



出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |





#### 4.**设置用户任务状态(setUserTaskStatus)**

入参

| taskId      | string | 任务标识                      |
| ----------- | ------ | ----------------------------- |
| completeNum | number | 用户当前完成数量              |
| openId      | string | 用户openId                    |
| status      | number | *待领取：1未完成：2已完成：3* |



出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |


#### 5.**自定义积分增减(changePoints)**

入参

| faceValue  | number | 积分数量                                                     |
| ---------- | ------ | ------------------------------------------------------------ |
| openId     | string | 用户openId                                                   |
| changeType | string | *变动类型(task)任务(exchange)奖励(other)其他*(sign)签到(invite)邀请 |
| id         | string | *任务标识taskId 或者奖励标识*                                |
| desc       | string | *描述*                                                       |
| prizeType  | string | *奖励类型(goods)实物(virtualGoods)虚拟物品(integral)积分；默认积分* |

出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |



#### 6.**获取奖励详情(getPrizeById)**

- B端获取指定奖励详情

入参

| id   | string | 奖励标识 |
| ---- | ------ | -------- |
|      |        |          |



出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |





#### 7.**获取任务详情(getTaskById)**

- B端获取指定任务详情

| id   | string | 任务标识 |
| ---- | ------ | -------- |
|      |        |          |

出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |





#### 8.**定时任务(timedTask)**

每日00：00触发

出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |



### **自定义接口**

#### 1.**发送虚拟奖品(send_prize)**

入参

| faceValue | number | 积分数量   |
| --------- | ------ | ---------- |
| prizeId   | string | 奖励标识   |
| openId    | string | 用户openId |



出参

| msg  | string | 返回信息 |
| ---- | ------ | -------- |
| code | number | 状态码   |



### **部分接口说明**

### 1.**设置用户任务状态**

- completeNum 传入总共完成数量 eg: 当前充值进度为350 就传入350 会与当前任务total最校验
- status 传入当前任务状态待领取 未完成 已完成；只有completeNum === total时才可以设置为待领取或已完成

### 2.**自定义积分增减**

- 此api配合签到打卡以及邀请有礼模块使用