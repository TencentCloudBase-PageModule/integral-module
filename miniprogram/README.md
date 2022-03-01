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
1.积分中心组件 [integralCenter](./components/integralCenter/README.md)
