# 列表

## 可用范围

[ATM(自动化运维)](http://git.one/WEB/web_atm)

## 使用方式

```vue
<template>
    <div>
        <table-list :data="option"></table-list>
    </div>
</template>

<script>
    import {ModuleRender} from 'frame'
    export default {
        components: {
            tableList
        },
        data(){
            return {
                option:{
                //...
                }
            }
        }
    }
</script>
```

## url

- 类型：`String`
- 默认值：无

列表数据接口

## title

- 类型：`String`
- 默认值：无

列表标题(与路径导航`面包屑`有关联逻辑)

## showTitle

- 类型：`Bool`
- 默认值：false

是否显示列表标题

## showPage

- 类型：`Bool`
- 默认值：false

是否显示列表分页

## authorityCode

- 类型：`Array<Object>`
- 默认值：无

列表查询相关权限声明

## btn

- 类型：`Array<Object>`
- 默认值：无

```javascript

```

### btn[].type

- 类型: `String`
- 默认值: 无
- 可选项: `onlyRequest,pageOpen,windowOpen,blank,custom`

声明按钮的动作类型,对应的动作如下:

1.`onlyRequest` 仅发送请求,常用于删除一类的按钮配置

2.`pageOpen` 在当前容器内打开`vue`属性指定的组件(需与`vue`属性配合使用)

3.`windowOpen` 在对话框中打开`vue`属性指定的组件(需与`vue`属性配合使用)

4.`blank` 打开新的浏览器窗口,常用于导出一类的按钮配置

5.`custom` 无动作

### btn[].vue

- 类型: `Vue`
- 默认值: 无

声明按钮的链接组件,当`type`属性为`pageOpen`或`windowOpen`时打开的组件

### btn[].text

- 类型: `String`
- 默认值: 无

声明按钮的文本内容

### btn[].btnAuthorityCode

- 类型: `String`
- 默认值: 无

声明按钮的功能权限信息

### btn[].position

- 类型: `String`
- 默认值: ``
- 可选项:`null,line,bottom`

声明按钮的位置,对应关系如下

1. `''` 为空时默认按钮在列表的右上角位置,该位置按钮超过四个时,会并到一个虚拟按钮`更多`里!

2. `line` 在列表的每一行数据的操作列中

3. `bottom` 在列表的坐下角位置

### btn[].alert

- 类型: `String`
- 默认值: ``

声明按钮是否需要弹出提示框确认操作,提示信息为该配置信息,为空时不触发

!> 当按钮配置`text`值为`删除`时会强制触发提示框!













