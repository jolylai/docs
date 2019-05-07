---
title: 'flatten'
date: '2019-05-07'
keywords:
    - 'flatten'
    - 'Lodash'
    - 'javascript'
sidebar: 'lodash'
---

Flattens array

## Symbol​.isConcat​Spreadable

The `Symbol.isConcatSpreadable` well-known symbol is used to configure if an object should be flattened to its array elements when using the `Array.prototype.concat()` method.

```js
const alpha = ['a', 'b', 'c'];
const numeric = [1, 2, 3];

let alphaNumeric;
alphaNumeric = alpha.concat(numeric);
console.log(alphaNumeric); // Result: ['a', 'b', 'c', 1, 2, 3]

numeric[Symbol.isConcatSpreadable] = false;
alphaNumeric = alpha.concat(numeric);
console.log(alphaNumeric); // Result: ['a', 'b', 'c', [1, 2, 3] ]
```

Array-like objects
For array-like objects, the default is to not spread. Symbol.isConcatSpreadable needs to be set to true in order to get a flattened array:

```js
const numeric = [1, 2, 3];

const fakeArray = {
    0: 'hello',
    1: 'world',
    length: 2,
};

numeric.concat(fakeArray); // Result: [1, 2, 3,{0: 'hello',1: 'world' ,length: 2}]

// Symbol.isConcatSpreadable needs to be set to true in order to get a flattened array
fakeArray[Symbol.isConcatSpreadable] = true;
numeric.concat(fakeArray); // Result: [1, 2, 3, "hello", "world"]
```

## isFlattenable

Checks if `value` is a flattenable `arguments` object or array.

```js
const spreadableSymbol = Symbol.isConcatSpreadable;

function isFlattenable(value) {
    // Array-like objects
    // !!(value && value[spreadableSymbol])
    return Array.isArray(value) || !!(value && value[spreadableSymbol]);
}
```

## baseFlatten ⭐️

The base implementation of `flatten` with support for restricting flattening.

```js
function baseFlatten(array, depth, predicate, isStrict, result = []) {
    if (array == null) {
        return result;
    }

    for (const value of array) {
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                result.push(...value);
            }
        } else if (!isStrict) {
            result[result.length] = value;
            // result.push(value)
        }
    }
    return result;
}
```

📝**Note**

-   undefind == null // -> true

## flatten

flatten array a single level deep

```js
function flatten(array) {
    if (array == null) {
        return [];
    }
    return baseFlatten(array, 1);
}
```

## flattenDeep

Recursively (递归) flattens array.

```js
const INFINITY = 1 / 0;

function flattenDeep(array) {
    if (array == null) {
        return [];
    }
    return baseFlatten(array, INFINITY);
}
```

## flattenDepth

```js
function flattenDepth(array, depth = 1) {
    if (array == null) {
        return [];
    }
    return baseFlatten(array, +depth);
}
```

**Note**

-   `+depth` equal `Number(depth)`
