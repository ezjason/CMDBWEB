# markdown助手 

## 提示框

效果:

!> 这是提示框

代码:
```markdown
!> 这是提示框
```

## 行内代码

效果:

`这是行内代码效果`

代码:

```markdown
`这是行内代码效果`
```

## 链接

效果:

[链接](http://baidu.com)

代码:

```markdown
[链接](http://baidu.com)
```

!> 内部链接不带`http://`

## 引用

效果:

> 简单引用1

>> 嵌套引用

> 1. 这是第一行列表项。

> 1. 这是第二行列表项。 


>      return false

> `引用中使用Markdown语法。` 

代码:

```markdown
> 简单引用1
>> 嵌套引用
> 1. 这是第一行列表项。
> 1. 这是第二行列表项。
>      return false
> `引用中使用Markdown语法。` 
```

## 列表

效果:

1. Bird
1. McHale


- Red
+ Green
* Blue

<http://example.com/>

代码:

```markdown
1. Bird
1. McHale

- Red
+ Green
* Blue
```

## 分隔线

效果:

---  

- - -
  
***
  
* * *
  
-----  

代码:

```markdown

---
- - -
***
* * *
-----

```

## 强调

效果:

 *斜体*
 _斜体_
 **粗体**
 __粗体__
 
代码:

```markdown
 *斜体*
 _斜体_
 **粗体**
 __粗体__
```

## 图片

效果:

![markdown](https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=79cf53f2074f78f0800b9df5410a6d68/00e93901213fb80ef9ceac7132d12f2eb938947d.jpg)

代码:

```markdown
![markdown](https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=79cf53f2074f78f0800b9df5410a6d68/00e93901213fb80ef9ceac7132d12f2eb938947d.jpg)
```

## 转义

使用反斜杠来插入一些在语法中有其它意义的符号,如*
需要转义的字符:

```markdown
\\   反斜线

\`   反引号

\*   星号

\_   底线

\{}  花括号

\[]  方括号

\()  括弧

\#   井字号

\+   加号

\-   减号

\.   英文句点

\!   惊叹号
```

##### [更多](https://docsify.js.org/#/zh-cn/plugins)