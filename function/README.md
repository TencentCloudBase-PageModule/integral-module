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
接口文档 [接口文档](../docs/apiDoc.docx)
1.`setUserTaskStatus` 设置用户任务状态
2.`changePoints` 设置用户奖励信息
3.`timedTask` 定时任务(每日00:00刷新用户过期积分、任务状态、奖励状态)
## example 示例实现

1. 发奖 [`send_prize`](./example/send_prize.md) 
## FAQ
### 1. 云函数如何和已有系统打通
云函数内可以通过http接口调用与已有系统打通。
