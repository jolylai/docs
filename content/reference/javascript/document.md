---
title: 'document相关的宽高属性'
date: '2019-04-24'
keywords:
    - 'document'
    - 'javascript'

sidebar: 'javascript'
---

[HTML 的各种宽高](https://www.jianshu.com/p/60332df38393)

## documentElement

`Document.documentElement` 是一个会返回文档对象（document）的根元素的只读属性（如 HTML 文档的 <html> 元素）。

```js
const rootElement = document.documentElement;
```

---

## 元素的宽高

需要考虑到滚动条的宽度

### HTMLElement.clientWidth

`HTMLElement.clientWidth` 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距（即 `content + padding`）。

如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高

### HTMLElement.clientHeight

`HTMLElement.clientHeight` 属性表示元素的内部高度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距（即 `content + padding`）。

这一对属性是用来读取元素的 border 的宽度和高度的

### HTMLElement.clientLeft

表示一个元素的左边框的宽度，以像素表示。如果元素的文本方向是从右向左（RTL, right-to-left），并且由于内容溢出导致左边出现了一个垂直滚动条，则该属性包括滚动条的宽度。clientLeft 不包括左外边距和左内边距。clientLeft 是只读的。

```js
const body = document.body;

// 即 CSS 中 border-left 的值
const borderLeft = body.clientLeft; // -> 20
```

### HTMLElement.clientTop

一个元素顶部边框的宽度（以像素表示）。不包括顶部外边距或内边距。clientTop 是只读的。

```js
const body = document.body;

// 即 CSS 中 border-top 的值
const borderLeft = body.clientTop; // -> 20
```

### HTMLElement.offsetWidth

`HTMLElement.offsetWidth`是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及 CSS 设置的宽度(width)的值。(即 `content + scrollbar + padding + border`)

各浏览器的 offsetWidth 可能有所不同，所有需要考虑兼容性

### HTMLElement.offsetHeight

HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

通常，元素的 offsetHeight 是一种元素 CSS 高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before 或:after 等伪类元素的高度。

对于文档的 body 对象，它包括代替元素的 CSS 高度线性总含量高。浮动元素的向下延伸内容高度是被忽略的。
