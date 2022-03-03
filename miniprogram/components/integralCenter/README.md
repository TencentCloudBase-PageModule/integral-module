# integralCenter 积分中心组件

## 组件属性
| 属性      | 参数                                | 说明                                                        | 默认值 |
| --------- | ----------------------------------- | ----------------------------------------------------------- | --------- |
| isSignModule | true\|false |是否开启签到模块 | false |
| tabsConfig | [{type:'exchange',jumpUrl:''},{type:'integralDetail',jumpUrl:''}] |积分明细与兑换好礼跳转路径配置 | "" |
| TaskEmptyTitle | { type: 'task', title: '任务已全部完成，暂无新任务' } |无任务时提示文案 | { type: 'task', title: '任务已全部完成，暂无新任务' } |
| PrizeEmptyTitle | { type: 'prize', title: '暂无可兑换礼品' } |无奖励时提示文案 | { type: 'prize', title: '暂无可兑换礼品' } |
| showNum | 4 |任务和奖励默认展示数量 | 4 |


## 代码演示

### 1.积分中心使用
```html
<IntegralCenter></IntegralCenter>

// 使用事件属性示例
<IntegralCenter 
  isSignModule="{{true}}" 
  showNum="{{2}}" 
  tabsConfig="{{[
  {type:'integralDetail',jumpUrl:'/scene-module/page_module_integral-center/example/integralDetails/index'},
  {type:'exchange',jumpUrl:'/scene-module/page_module_integral-center/example/integralExchange/index'}]}}"
  TaskEmptyTitle="无任务"
  PrizeEmptyTitle="无奖品"
  >
</IntegralCenter>
```

### 2.积分中心内嵌签到模块

- 在当前积分中心文件夹中的index.json中引入签到打卡模块(需要配置签到模块单页模板)
- 在usingComponents中配置`"Sign": "签到打卡模块路径"`
- 在积分中心内引入Sign使用签到打卡模块

```html
<IntegralCenter isSignModule = "{{true}}">
  <Sign/> 
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



## 注意事项

1.需要在详情中本地设置开启将JS编译成ES5。
2.需要在app.json导入积分明细与兑换记录路径。
3.未配置积分明细与兑换记录跳转路径时不可用。

## FAQ
