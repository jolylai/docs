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

Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

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
* 增加第二种：User.create
* 可以创建多条数据，有两种写法，多条数据插入就多条请求，性能比较慢
* 但是内部会对每一个插入的数据进行验证，中途验证失败后，不会停止过程，只会挑取符合条件的保存，错误的抛出异常不保存
*/
User.create(   //User.create第一种形式，分开用json对象加入
  { name: "yangmi" }, { name: "tangyan" }
).then((u1, u2) => {  //创建多少个参数，就有多少个形参
  console.log(u1, u2)
}).catch(err => { console.log(err) })

User.create([   //User.create第二种形式，采用数组
  { name: "liukaiwei" }, { name: "luojidong" }
]).then(arr => {   //由于以数组创建，因此形参就是数组格式
  console.log(arr)
}).catch(err => { console.log(err) })

/**
* 增加第三种：User.insertMany
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
* 修改第二种：User.update
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
* 删除第二种：User.remove
* 删除多条，可以加删除条件限制，条件可以是正则或其他，不加时全部删除
*/
User.remove({ name: /^hong\d*$/ })
User.remove({})
```

## Query

### Base Query

```js
//通过id查找一条数据
User.findById(id, function(err, result) {
    console.log(result);
});

//通过id查找出一条数据，并将它删除掉
User.findByIdAndRemove(id, function(err, result) {
    console.log(result + '此数据返回的是删掉的那一条数据，但是在数据库中是不存在的');
});

//通过Id找到一条数据，并对其进行更改，第二个参数是更改的内容，可以增加第三个参数对更改内容进行验证
User.findByIdAndUpdate(id, { name: 'mei' }, { runValidators: true }, function(err, result) {
    console.log(result + '返回回来的还是之前没更改的内容，但是在数据库中已经更改成功了');
});

/**
 * 根据查询条件查找一条数据
 * 衍生出来的还有：User.findOneAndRemove / User.findOneAndUpdate
 */
User.findOne({ name: /^rose\d$/ }, function(err, result) {
    console.log(result + '就算查询到很多条，也只返回查到的第一条');
});

/**
 * 返回全部集合的结果
 * 第一个参数：{}代表全部，也可以加入查询条件
 * 第二个参数：针对单独返回字段，可加可不加，有两种形式，_id注定返回
 *             前缀有"-"代表不返回该字段，其他字段返回；
 *             前缀无"-"代表只会返回该字段，其他字段忽略
 * 第三个参数：若有第三个参数存在，第二个参数无要求设定为null，限定条件，有skip
 */
User.find({}, '-name', { skip: 5, limit: 6 }, function(err, result) {
    console.log(result + 'skip跳过前5个，最大返回6条数据');
});
```

### Compare Query

```js
/**
 * $gt 大于   $gte 大于等于
 * $lt 小于   $lte 小于等于
 * $eq 等于   $ne  不等于
 */
User.find({ num: { $lt: 20, $gt: 10 } }, function(err, result) {
    console.log(result + '返回大于10，小于20的区间数据');
});

/**
 * $in 包含   $nin 不包含
 */
User.find({ num: { $nin: [11, 15] } }, function(err, result) {
    console.log(result + '所有不包含11或者15的都会被查询到');
});
```

### Logical Query

```js
/**
 * $or 或
 * $nor 异或（$or相反）:除了条件以外的都会被查询返回，相当于对$or取反
 */
User.find({ $or: [{ name: 'hong' }, { num: 2 }] }, function(result) {
    console.log(
        result + '返回多条数据，只要其中的name或者num一个条件，就会被查询到，可以加很多个条件'
    );
});

//$and 和
User.find({ $and: [{ name: /~hong\d*$/ }, { num: { $lte: 15 } }] }, function(result) {
    console.log(result + '返回多条，两个条件都满足的情况下才返回查询');
});

//$not 否：所有不符合条件的都会被返回，类似于或和异或的关系
User.find({ name: { $not: { $eq: 'hmt' } } }, function(result) {
    console.log(result + '所有名字不等于hmt会被返回');
});
```

### Array Query

```js
//$all 是否包含查询条件，数组结构形参
User.create([
  { arr: [11, 22, 33] },
  { arr: [33, 44, 55] },
  { arr: [55, 66, 77] }
]).then(function(){
  User.find({ arr: { $all: [33,44] } }).then(function(result) {
    console.log(result + "如果一个数组中同时包含33和44的话，打印出[33, 44, 55]")
  })

  /** 上面的$all修改成jQuery方法链查询风格，看得懂就行，随便整理笔记的运行不了 **/
  /** 采用jQuery参数风格 **/
  let query = User.find()
  query.where("arr")
       .all([33,44]).
       .limit(3)
       .skip(2)
       .select("name age")  //相当于过滤返回查看字段“name age”
       .exec(function(err, result) {
          console.log("用where指定要查询的对象是谁")
       })
   })

//$elemMatch 数组元素查询条件，对象结构形参
User.create([
  { arr: [ {name: "n11"}, {name: "n22"}, {name: "n33"} ] },
  { arr: [ {name: "n33"}, {name: "n44"}, {name: "n55"} ] },
  { arr: [ {name: "n55"}, {name: "n66"}, {name: "n77"} ] }
]).then(function(){
  User.find({ arr: { $elemMatch: { name: "n33" } } }).then(function(result) {
    console.log(result + "返回两条包含33的整条数组")
    console.log("第一条[ {name: "n11"}, {name: "n22"}, {name: "n33"} ] }")
    console.log("第二条[ {name: "n33"}, {name: "n44"}, {name: "n55"} ] }")
  })

  /** 上面的$all修改成jQuery方法链查询风格，看得懂就行，随便整理笔记的运行不了 **/
  /** 采用jQuery函数风格 **/
  User.find().where("arr").elemMatch(function(elem) {
    elem.where("name").eq("n33").where("num").gte(10)
  }).exec(function(err, result) {
    console.log("用where指定要查询的对象是谁，eq代表$eq等于，gte代表$gte啊啊啊")
  })
})

//$size 数组大小查询条件
User.create([
  { arr: [11] },
  { arr: [33, 44] },
  { arr: [55, 66, 77] }
]).then(function(){
  User.find({ arr: { $size: 2 } }).then(function(result) {
    console.log(result + "返回长度为2的数组，打印出[33, 44]")
  })
})

//$where 其他，结构更为复杂时使用，javascript方法体形参
User.create([
  { obj: {name: "java"} },
  { obj: {name: "javascript"} },
  { obj: {name: "nodejs"} }
]).then(function() {
  User.find({ $where: "this.obj.name === 'java'" }).then(function(result) {
    console.log(result + "打印出第一条")
  })
  User.find({
    $where: function() {
      return /^java\w*$/.test(this.obj.name)
    }
  }).then(function(result) {
    console.log(result + "打印出第一条和第二条，通过正则表达式作各种判断")
  })
})
```

### Query Helpers

```js
UserShema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') });
};

const User = mongoose.model('User', UserSchema);
User.find()
    .byName('fido')
    .exec(function(err, users) {
        console.log(users);
    });

User.findOne()
    .byName('fido')
    .exec(function(err, user) {
        console.log(user);
    });
```
