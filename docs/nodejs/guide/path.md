# 路径 path

在计算机科学中指计算机之间或人与计算机之间的信息交换。比如两台计算机通过网卡进行交互，比如向硬盘写入数据或读取硬盘数据，比如人敲击鼠标键盘等，都是 I/O。

要处理文件就必须先知道文件的路径，path 模块就是一个用来处理文件和文件夹路径的工具

### 模块路径

当前模块的文件路径名

```js
console.log('__dirname', __dirname)
// /Users/nodejs/src/basic/io/path/demo
console.log('__filename', __filename)
//  /Users/nodejs/src/basic/io/path/demo/resolve.js
```

- `__filename`: The file name of the current module. This is the current module file's absolute path with symlinks resolved.
- `__dirname`：The directory name of the current module. This is the same as the `path.dirname()` of the `__filename`.

### 文件名解析

```js
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
```

- `dirname`: 获取文件的父文件夹。
- `basename`: 获取文件名部分。
- `extname`: 获取文件的扩展名。

可以通过为 basename 指定第二个参数来获取不带扩展名的文件名：

```js
path.basename(notes, path.extname(notes)) // notes
```

### 路径解析
