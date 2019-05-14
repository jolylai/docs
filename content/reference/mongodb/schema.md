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

  // getter setter
  str: {
    type: String,
    get(v){
      return v+123
    },
    set(v){
      return 123+v
    }
  }

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
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator(value) {
                return value.length <= 9;
            },
        },
    },
});
const User = mongoose.model('User', UserSchema);

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

## Methods

```js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    //定义类似于JavaScript原型的结构
    firstName: String,
    secondName: String,
});
/**
 * 加入实例方法
 * schema.methods.xxx
 */
userSchema.methods.getAllName = function() {
    //this等于对象本身，即原型！可以调用任意的api，无限制，只要表现在于定义的形式
    return this.firstName + '.' + this.secondName;
};
/**
 * 加入静态方法
 * schema.statics.xxx
 */
schema.statics.getAll = function(cb) {
    //this这个时候等于集合，即集合底层的users，因此可以对数据库进行操纵
    return this.find({}, cb); //也可以加入回调函数
};
/**
 * 加入虚拟setter/getter方法
 * virtual("xxx").get(handle)
 * virtual("xxx").set(handle(value))
 */
userSchema.virtual('allname').get(function() {
    return this.firstName + '.' + this.secondName;
});
userSchema.virtual('allname').set(function(v) {
    this.firstName = v.firstName;
    this.secondName = v.secondName;
});
const User = mongoose.model('User', userSchema); //创建实际的类

//测试调用
const u = new User({
    firstName: 'hong',
    secondName: 'meiting',
});
console.log(u.getAllName()); //打印hong.meiting，此为对象实例方法的调用
User.getAll().then(result => {
    console.log('调用静态方法成功，查询到数据库了');
});
const u2 = new User({
    allname: { firstName: 'hong', secondName: 'meting' },
});
console.log(u2); //打印出 firstName: "hong",secondName: "meting"，已经在虚拟方法中被赋值了
```
