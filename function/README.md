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
1. [`send_prize`发奖接口](https://github.com/TencentCloudBase-PageModule/integral-module/tree/master/docs/api.md#发送虚拟奖品(send_prize))
## example 示例实现

1. 发奖 [`send_prize`](./example/send_prize.js) 
