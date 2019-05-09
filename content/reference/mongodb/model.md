---
title: 'Model'
date: '2019-05-09'
keywords:
    - model
    - mongodb
    - database
sidebar: 'mongodb'
---

[Reference](https://zhuanlan.zhihu.com/p/37283130)

## Cetate Model

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

const User = mongoose.model('User', UserSchema);
```

## Create

```js
const mongoose = require("mongoose")
const User = mongoose.model("User", {
  name: String
})

/**
* 增加第一种：obj.save
* 每次只能一条，可以加回调参数，也可不加，不加参数时返回的是promise对象
*/
const user1 = new User({ name: "hmt" })  //可简写或者用new mongoose.Schema方式
user1.save()

/**
* 增加第二种：Class.create
* 可以创建多条数据，有两种写法，多条数据插入就多条请求，性能比较慢
* 但是内部会对每一个插入的数据进行验证，中途验证失败后，不会停止过程，只会挑取符合条件的保存，错误的抛出异常不保存
*/
User.create(   //Class.create第一种形式，分开用json对象加入
  { name: "yangmi" }, { name: "tangyan" }
).then((u1, u2) => {  //创建多少个参数，就有多少个形参
  console.log(u1, u2)
}).catch(err => { console.log(err) })

User.create([   //Class.create第二种形式，采用数组
  { name: "liukaiwei" }, { name: "luojidong" }
]).then(arr => {   //由于以数组创建，因此形参就是数组格式
  console.log(arr)
}).catch(err => { console.log(err) })

/**
* 增加第三种：Class.insertMany
* 可以创建多条数据，只有一种写法，由于是通过一条请求跟数据库交互的底层操作
* 所以只要过程中有一条数据插入错误，那么所有数据都保存不成功，但是性能比create快
*/
User.insertMany([
  { name: "liushishi" }, { name: "wujilong" }
]).then(arr => {     //由于以数组创建，因此形参就是数组格式
  console.log(arr)
}).catch(err => { console.log(err) })

/**
* 修改第一种：obj.update
* 修改过程中默认不会有验证处理，如果需要对其进行验证，需要加入第二个参数runValidators
* 修改成功后返回的结果相当于node底层的数据格式{ok:1, nModified:1 ,n:1}，观察ok数字变化即可
*/
user1.update({ name: "angelbaby"}, {runValidators; true})
.then(result => {
  console.log(result)
}).catch(err => { console.log(err) })

/**
* 修改第二种：Class.update
* 批量更改，第一个参数是更改的条件，{}代表全部
* 默认下只会更改第一个符合条件的对象，如果要更改全部符合条件的对象话，需要加入第三个参数multi
* 返回结果格式{ok: 1, nModified: 4[有4次更改的意思], n: 4[更改的对象条数]}
*/
User.update({}, {name: "angelbaby"}, {multi: true}, function(err, result) => {
  console.log(err, result)
})

/**
* 删除第一种：obj.remove
* 每次只能一条，可以加回调参数，也可不加，不加参数时返回的是promise对象
*/
user1.remove()

/**
* 删除第二种：Class.remove
* 删除多条，可以加删除条件限制，条件可以是正则或其他，不加时全部删除
*/
User.remove({ name: /^hong\d*$/ })
User.remove({})
```
