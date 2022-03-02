# integralCenter 积分中心组件

## 组件属性
| 属性      | 参数                                | 说明                                                        | 默认值 |
| --------- | ----------------------------------- | ----------------------------------------------------------- | --------- |
| isSignModule | true\|false |是否开启签到模块 | false |
| tabsConfig | [{type:'exchange',jumpUrl:''},{type:'integralDetail',jumpUrl:''}] |积分明细与兑换好礼跳转路径配置 | "" |
| emptyTitle | {type:'task',title:'任务已全部完成，暂无新任务'},{type:'exchange',title:'暂无可兑换礼品'} |无任务无奖励时提示文案 | {type:'task',title:'任务已全部完成，暂无新任务'},{type:'exchange',title:'暂无可兑换礼品'} |
| showNum | 4 |任务和奖励默认展示数量 | 4 |


## 代码演示

### 1.积分中心使用
```html
<IntegralCenter showNum="4"></IntegralCenter>
```

### 2. 跳转链接
1. 新建2个页面引入积分明细、兑奖明细组件
2. 在积分中心的组件中的jumpUrl属性中录入对应的积分、兑换明细的跳转链接。

```html
<IntegralCenter tabsConfig="{{ [{type:'exchange',jumpUrl:''},{type:'integralDetail',jumpUrl:''}] }}"></IntegralCenter>
```
### 3.积分中心内嵌签到模块

1. 在当前积分中心文件夹中的index.json中引入签到打卡模块(需要配置签到模块单页模板)，在usingComponents中配置`"Sign": "签到打卡模块路径"`
2. 在积分中心内引入Sign使用签到打卡模块
3. 参考[签到打卡组件](https://github.com/TencentCloudBase-PageModule/sign-up/blob/master/miniprogram/components/signUp/README.md)进行详细配置

```html
<IntegralCenter isSignModule = "{{true}}">
  <Sign temId="eJ8NG1u50h13GiwfDpLtWBt42XekeY19yzmn5hPFr9o" page="pages/index/index"></Sign> 
</IntegralCenter>
```


## 事件属性

| 属性      | 参数                                | 说明                                                        |
| --------- | ----------------------------------- | ----------------------------------------------------------- |
| customize | {taskId,title,total,faceValue,icon} | 任务中设置的自定义事件都会通过customize事件传递当前任务信息 |

### 代码示例

```
<!-- index.wxml -->
<IntegralCenter bind:customize="onMyEvent"></IntegralCenter>

<!-- index.js -->
  Page({
  onMyEvent: function(e){
    e.detail // 当前任务信息
  }
})
```

## FAQ
