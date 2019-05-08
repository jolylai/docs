---
title: 'compact'
date: '2019-05-07'
keywords:
    - 'compact'
    - 'Lodash'
    - 'javascript'
sidebar: 'lodash'
---

Creates an array with all falsey values removed. The values `false`, `null`,`0`, `""`, `undefined`, and `NaN` are falsey.

```js
/**
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 */

function compact(array) {
    let resultIndex = 0;
    const result = [];

    if (array == null) {
        return result;
    }

    for (const value of array) {
        if (value) {
            result[resultIndex++] = value;
        }
    }

    return result;
}
```

this is equal

```js
function compact(array) {
    if (array == null) {
        return [];
    }
    return array.filter(Boolean);
}
```
