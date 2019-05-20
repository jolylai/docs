---
title: 'Coercion'
date: '2019-05-20'
keywords:
    - 'JavaScript'
    - 'You Dont Know JS'
    - 'Coercion'

sidebar: 'javascript'
---

As compared to other type-enforced languages, JavaScript arrays are just containers for any type of value, from string to number to object to even another array (which is how you get multidimensional arrays).

## ToString

要把一个值转换为一个字符串有两种方式。

第一种是使用几乎每个值都有的 `toString()`方法。这个方法唯一要做的就是返回相应值的字符串表现。

```js
// Built-in primitive values
let a;

//  `undefined` 值没有`toString()`这个方法
a.toString(); // Uncaught TypeError: Cannot read property 'toString' of undefined

// `null` 值没有`toString()`这个方法
a = null;
a.toString(); // Uncaught TypeError: Cannot read property 'toString' of undefined

a = true;
a.toString(); // "true"
```

**Note**

-   `null` 和 `undefined` 值没有`toString()`这个方法
-   多数情况下，调用 toString()方法不必传递参数。但是，在调用数值的 toString()方法时，可
    以传递一个参数：输出数值的基数。默认情况下，toString()方法以十进制格式返回数值的字符串表
    示。

第二种使用`String()` 基本包装类型

**String()函数遵循下列转换规则：**

-   如果值有 `toString()`方法，则调用该方法（没有参数）并返回相应的结果；
-   如果值是 `null`，则返回`"null"`；
-   如果值是 `undefined`，则返回`"undefined"`。

### Number

```js
const a = 10;
// 默认十进制
a.toString(); // "10"
a.toString(2); //"1010"
a.toString(8); // "12"
a.toString(10); // "10"
a.toString(16); // "a"

// multiplying `1.07` by `1000`, seven times over
const number = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

// seven times three digits => 21 digits
number.toString(); // "1.07e21"
String(number); // "1.07e21"
```

### Object

```js
// Object
let obj = {
    age: 18,
};
obj.toString(); //  "[object Object]"
obj = {
    age: 18,
    toString: function() {
        return this.age;
    },
};
obj.toString(); //  18
```

**Note**

-   对普通对象来说，除非自行定义，否则 `toString()`（Object.prototype.toString()）返回内部属性 [[Class]] 的值，如 "[object Object]"。
-   如果对象有自己的 `toString()` 方法，字符串化时就会调用该方法并使用其返回值。

### Array

```js
[null].toString(); // ""
[undefined].toString(); // ""
[true].toString(); // "true"
[1, 2, 3].toString(); //  "1,2,3"
[{}].toString(); // "[object Object]"
[[1, [2]]].toString(); // "1,2"
```

**Note**

-   数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起来

### JSON Stringification

> [JSON.stringify(value[, replacer [, space]])](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

所有安全的 JSON 值（JSON-safe）都可以使用 JSON.stringify(..) 字符串化。不是只能 JSON 对象。

```js
JSON.stringify(42); // "42"
JSON.stringify('42'); // ""42"" (a string with a quoted string value in it)
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"
```

**Note:不安全的 JSON 值**

-   undefined
-   function
-   symbol（ES6+）
-   包含循环引用（对象之间相互引用，形成一个无限循环）的对象
-   对包含循环引用的对象执行 JSON.stringify(..) 会出错。

JSON.stringify(..) 在对象中遇到 `undefined`、`function` 和 `symbol` 时会自动将其忽略，在
数组中则会返回 `null`（以保证单元位置不变）。

```js
JSON.stringify(undefined); // undefined
JSON.stringify(function() {}); // undefined

// 遇到 `undefined`、`function` 和 `symbol` 时
// 返回 `null`（以保证单元位置不变）
JSON.stringify([1, undefined, function() {}, 4]); // "[1,null,null,4]"
// 自动将其忽略
JSON.stringify({ a: 2, b: function() {} }); // "{"a":2}"
```
