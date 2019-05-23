---
title: 'difference'
date: '2019-05-07'
keywords:
    - 'difference'
    - 'Array'
    - 'javascript'
sidebar: 'lodash'
---

Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.

```js
_.difference(array, [values]);

const flatten = array => {
    return array.reduce((a, b) => a.concat(b), []);
};
const difference = (array, ...values) => {
    const flatValues = flatten(values);
    return array.filter(value => !flatValues.includes(value));
};
```
