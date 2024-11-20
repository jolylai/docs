# 文件系统 fs

## 读取文件

在 Node.js 中读取文件最简单的方式是使用 `fs.readFile()` 方法，向其传入文件路径、编码、以及会带上文件数据（以及错误）进行调用的回调函数

```js
import fs from 'node:fs'

fs.readFile('README.md', (err, data) => {
  if (err) {
    console.log('err: ', err)
    return
  }
  console.log('data: ', data)
})
```

传入的路径如果是相对路径则会相对于当前工作目录进行解析

当读取二进制文件时，不传入文件编码时，回调函数的 `data` 参数将返回一个 `Buffer` 对象。

```js
import fs from 'node:fs'

fs.readFile('README.md', 'utf-8', (err, data) => {
  if (err) {
    console.log('err: ', err)
    return
  }
  console.log('data: ', data)
})
```

同步读取一个文本文件,如果同步读取文件发生错误，则需要用 `try...catch` 捕获该错误

```js
import fs from 'node:fs'

try {
  const data = fs.readFileSync('README.md', 'utf-8')
  console.log('data: ', data)
}
catch (err) {
  // 出错了
}
```

## 写入文件

使用 `fs.writeFile()` 向文件写入内容，如果文件不存在则创建一个新的文件，如果文件已存在则覆盖文件的内容

```js
import fs from 'node:fs'

const fileContent = '文件内容'

fs.writeFile('test.txt', fileContent, (err) => {
  if (err)
    console.log('err: ', err)

  else
    console.log('写入成功')
})
```

`writeFile()`的参数依次为文件名、数据和回调函数。如果传入的数据是 String，默认按`UTF-8`编码写入文本文件，如果传入的参数是`Buffer`，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个 err 参数。

也可以使用同步的版本 `fs.writeFileSync()`

```js
import fs from 'node:fs'

const fileContent = '同步写入文件内容'

try {
  fs.writeFileSync('test.txt', fileContent)
}
catch (error) {
  console.log('error: ', error)
}
```

## 文件属性

每个文件都带有一组详细信息,如：文件大小，创建时间等，可以使用 `fs.stat()`，它返回一个 Stat 对象，能告诉我们文件或目录的详细信息

```js
import fs from 'node:fs'

fs.stat('test.txt', (err, stat) => {
  if (err) {
    console.log('err: ', err)
    return
  }

  // 文件大小:
  console.log(`size: ${stat.size}`)
  // 创建时间, Date对象:
  console.log(`birth time: ${stat.birthtime}`)
  // 修改时间, Date对象:
  console.log(`modified time: ${stat.mtime}`)
})
```

判断文件是否存在

```js
import fs from 'node:fs'

const util = require('node:util')

const access = util.promisify(fs.access)

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  }
  catch (err) {
    return false
  }
}
```

## 文件权限

```js
import { access, constants } from 'node:fs'

const file = 'package.json'

// Check if the file exists in the current directory.
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`)
})

// Check if the file is readable.
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`)
})

// Check if the file is writable.
access(file, constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`)
})

// Check if the file exists in the current directory, and if it is writable.
access(file, constants.F_OK | constants.W_OK, (err) => {
  if (err)
    console.error(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`)

  else
    console.log(`${file} exists, and it is writable`)
})
```

## ensureFile

1. fs.stat 判断文件是否存在如果存在则调用 callback
2. path.dirname() 获取文件夹路径
3. fs.stat 判断文件夹是否存在，如果报错且 `err.code === 'ENOENT'` 则 fs.mkdir() 先创建文件夹，然后 fs.writeFile() 创建文件
4. 如果父级不是文件夹，则使用 fs.readdir() 抛出一个错误

```js
fs.stat('README.md', (err, stat) => {
  if (err) {
    console.log('err: ', err)
    return
  }

  if (stat.isFile()) {
    // 读取的是文件
  }

  if (stat.isDirectory()) {
    // 读取的是目录
  }
})
```

## 全局文件

[globby](https://github.com/sindresorhus/globby) 通配符快速概述

- `*`: 匹配任意数量的字符，但不包括 /
- `?`: 匹配单个字符，但不包括 /
- `**`: 匹配任意数量的字符，包括 /，只要它是路径部分中唯一的内容
- `{}`: 允许逗号分隔的“或”表达式列表
- `!`: 在模式开头将对匹配进行否定

```js
const files = await globby(['*.mjs'], {
  cwd: path.resolve(process.cwd(), 'oss'),
  ignoreFiles: [],
})
```
