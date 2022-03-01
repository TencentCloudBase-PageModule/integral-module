# integralCenter 积分中心组件

## 组件属性
| 属性      | 参数                                | 说明                                                        | 默认值 |
| --------- | ----------------------------------- | ----------------------------------------------------------- | --------- |
| isSignModule | true\|false |是否开启签到模块 | false |



## 代码演示

### 1.积分中心使用
```html
<IntegralCenter></IntegralCenter>
```

### 2.积分中心内嵌签到模块
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


## FAQ
