---
title: 'Schema'
date: '2019-05-09'
keywords:
    - schema
    - mongodb
    - database
sidebar: 'mongodb'
---

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

## Defining a Schema

```js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  // String
  str: {
    type: String,
    enum: ["aaa", "bbb"]  第一种：验证枚举
    match: /^\d*$/        第二种：验证正则表达式(纯数字正则)
    maxlength: 12         第三种：验证限制字符串最大长度
    minlength: 5          第四种：验证限制字符串最小程度
    lowercase: true       第五种：设置保存时，将所有英文全部转化为小写
    uppercase: true       第六种：设置保存时，将所有英文全部转化为大写
    trim: true            第七种：设置保存时，去掉前后空白字符
  },

  // Number
  num: {
    type: Number,
    min: 6                第一种：验证最小值
    max: 20               第二种：验证最大值
  },

  // Date
  date: {
    type: Date,
    min: new Date(baseDateNum - 1000)   第一种：验证最小值
    max: new Date(baseDateNum + 2000)   第二种：验证最大值
  }
});

```

## Custom Validate

```js
/**
 * 验证器函数本身 validator(v, [callback])
 * 第一个参数：形参，验证的数据
 * 第二个参数：没有此参数属于同步验证器，加入此参数变为异步验证器
 * 最终返回Boolean值，如果是false表示验证失败
 */
const mongoose = require('mongoose');
/**
 * 第一种写法 validate: { validator: Function }
 * PS：只可以加入一个验证器
 */
const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
            validate: {
                validator(value) {
                    return value.length <= 9;
                },
            },
        },
    })
);

/**
 * 第二种写法 Class.schema.path(xxx).validate(fn)
 * 可以加入多个验证器
 */
const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: { type: String },
    })
);
User.schema.path('name').validate(function(v) {
    return v.length <= 9;
});
```
