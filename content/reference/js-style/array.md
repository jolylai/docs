---
title: 'Array'
date: '2019-04-25'
keywords:
    - 'Array'
    - 'javascript'
sidebar: 'js-style'
---

## 向数组追加一项

`Array​.prototype​.push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```js
const someStack = [];
someStack.push('a');
```

## 复制数组

```js
const items = [1, 2, 3];
const itemsCopy = [...items];
```

## 类数组对象转成数组

[`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

```js
// 类数组
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
const arr = Array.from(arrLike);
```

## 遍历可迭代对象

用 `Array.from` 取代 `...` 来遍历可迭代对象，因为这样可以避免中间数组

```js
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```
