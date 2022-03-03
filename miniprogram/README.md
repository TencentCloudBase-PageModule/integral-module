# 积分中心
## 概述
积分中心的前端源码组件，支持做任务赚积分，积分兑换奖励。

## 目录说明
```
├─ components
│  ├─ _base # 基础组件，外部请勿依赖
│  │  ├─ card
│  │  ├─ detail
│  │  ├─ dialog
│  │  └─ halfScreenDialog
│  ├─ integralCenter # 对外暴露的组件，请在页面中引用该组件
│  │  ├─ index.js
│  │  ├─ index.json
│  │  ├─ index.wxml
│  │  ├─ index.wxss
│  │  └─ README.md # 积分中心模块使用说明
│  ├─ integralDetalis # integralCenter依赖积分明细界面
│  ├─ integralExchange # integralCenter依赖兑换记录界面
│  └─ readme.md # 组件说明
├─ example # 示例页面，简单对组件的引用拼装
├─ miniprogram_npm # 组件内置依赖的npm
└─ readme.md # 概述该模块，对外暴露组件简介
```
## 组件介绍

1. 积分中心组件 [integralCenter](./components/integralCenter/README.md)
2. 积分明细组件 [integralDetalis](./components/integralCenter/README.md)
3. 兑换明细组件 [integralExchange](./components/integralExchange/README.md)


## 注意事项
1. 需要在详情中本地设置开启将JS编译成ES5。
2. 需要在app.json导入积分明细与兑换记录路径。

## 上手介绍

1. 【必选】在积分中心组件中配置积分、兑换明细[跳转的页面链接](./components/integralCenter#2-跳转链接)
2. 【可选】与签到打卡联动
[积分中心内嵌签到打卡](./components/integralCenter#3积分中心内嵌签到模块)
3. 【必选】管理端添加任务与礼品
4. 【必选】[业务系统联动打通](https://github.com/TencentCloudBase-PageModule/integral-center/tree/master/docs/diy.md)
   1. 任务完成需要由业务侧进行标记，例如，用户关注了公众号，则按照如下代码进行调用标识任务完成。
   2. 配置自定义接口 [积分中心-发放礼品send_prize接口] 到云函数，自行发奖
   3. 当前依赖业务侧主动调用任务刷新接口才会对任务进行刷新，请定时调用该函数。
   4. 【可选】业务侧可以开发一些新模块，需要加减积分的
   5. 【可选】自定义任务需要业务自行捕获[事件](https://github.com/TencentCloudBase-PageModule/integral-center/tree/master/miniprogram/components/integralCenter#%E4%BA%8B%E4%BB%B6%E5%B1%9E%E6%80%A7)，并执行自定义动作 

## 组件介绍
