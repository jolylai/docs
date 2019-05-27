---
title: 'isNull'
date: '2019-05-07'
keywords:
    - 'isNull'
    - 'Lang'
    - 'Lodash'
sidebar: 'lodash'
---

Checks if `value` is `null` or `undefined`.

```js
/**
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 *
 * undefined == null  // true
 */
const isNull = value => value === null;

const isNull = value => typeof value === 'object' && !value;
```

example

```js
isNull(null); // true
isNull(undefined); // false
isNull(void 0); // false
```
