---
title: 'Types'
date: '2019-04-30'
keywords:
    - 'JavaScript'
    - 'You Dont Know JS'
    - 'Types'

sidebar: 'javascript'
---

Some people say JS shouldn't claim to have "types," and they should instead be called "tags" or perhaps "subtypes".

## Built-in Types

-   null
-   undefined
-   boolean
-   number
-   string
-   object
-   symbol -- added in ES6!

**Note**: All of these types except object are called "primitives"(基本类型).

## typeof operator

```js
typeof undefined === 'undefined'; // true
typeof true === 'boolean'; // true
typeof 42 === 'number'; // true
typeof '42' === 'string'; // true
typeof { life: 42 } === 'object'; // true

// added in ES6!
typeof Symbol() === 'symbol'; // true

// It's special -- special in the sense
// it's buggy when combined with the typeof operator:
typeof null === 'object'; // true

function func() {}
typeof func === 'function'; // true
```

test for a null value using its type

```js
const a = null;
// (!a -> true)  a maybe false or null

!a && typeof a === 'object'; // true
```

## undefined vs "undeclared"

Many developers will assume "undefined" and "undeclared" are roughly the same thing, but in JavaScript, they're quite different. undefined is a value that a declared variable can hold. "Undeclared" means a variable has never been declared.

JavaScript unfortunately kind of conflates these two terms, not only in its error messages ("ReferenceError: a is not defined") but also in the return values of typeof, which is "undefined" for both cases.

```js
const a;
a; // undefined
b; // ReferenceError: b is not defined
typeof a; // "undefined"
typeof b; // "undefined"
```

Check for the global DEBUG variable.The safety guard on typeof is our friend in this case.

```js
// oops, this would throw an error!
if (DEBUG) {
    console.log('Debugging is starting');
}

// this is a safe existence check
if (typeof DEBUG !== 'undefined') {
    console.log('Debugging is starting');
}
```
