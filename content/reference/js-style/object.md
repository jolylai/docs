---
title: 'Object'
date: '2019-04-25'
keywords:
    - 'Object'
    - 'javascript'
sidebar: 'js-style'
---

## 保留字

不要使用保留字作为对象的 key，IE8 无法运行

```js
// bad
const superman = {
    default: 2,
    private: true,
};
```

## 对象方法简写

```js
// bad
const atom = {
    value: 1,
    addValue: function(value) {
        return atom.value + value;
    },
};
// good
const atom = {
    value: 1,
    addValue(value) {
        return atom.value + value;
    },
};
```

## 属性值简写

```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
    lukeSkywalker: lukeSkywalker,
};

// good
// 将属性简写放在对象起始位声明
const obj = {
    lukeSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
};
```

## 只对无效标识符加单引号

```js
const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
};
```

## 不要直接调用对象原型链上的方法

这些方法可能被对象的属性掩盖，思考 { hasOwnProperty: false } ，或者对象可能是 null (Object.create(null)).

```js
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
// cache the lookup once, in module scope.
const has = Object.prototype.hasOwnProperty;
/* or */
const has = require('has');
console.log(has.call(object, key));
```
