# 事件触发器

如果您在浏览器中使用过 JavaScript，您就会知道有多少用户交互是通过事件处理的： 鼠标点击、键盘按钮按下、对鼠标移动做出反应等等。

```js
const btn = document.addEventListener('click', () => {})
```

在 Node.js 我们使用 `events` 模块 构建类似系统的选项。

```js
import EventEmitter from 'node:events'

const eventEmitter = new EventEmitter()

eventEmitter.on('start', (count) => {
  console.log('start', count)
})

eventEmitter.emit('start', 1)
eventEmitter.emit('start', 2)
eventEmitter.emit('start', 3)
eventEmitter.emit('start', 4)
```

## 单次监听器

```js
const EventEmitter = require('node:events')

const eventEmitter = new EventEmitter()

eventEmitter.once('start', () => {
  console.log('start')
})

eventEmitter.emit('start')
eventEmitter.emit('start')
eventEmitter.emit('start')
eventEmitter.emit('start')
```

## 参考资料

- [mitt](https://github.com/developit/mitt)
