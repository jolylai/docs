# 进程管理

1. 标签模板参数拼接
2. exec 执行命令
3. exec 标准输入输出

## 标签模板

```js
function $(pieces, ...args) {
  console.log('pieces: ', pieces)
  console.log('args: ', args)
}
```

声明一个 \$ 函数，打印查看传入的参数，使用模板字符串执行 \$ 函数

```js
const person = 'Mike'
const age = 28

$`That ${person} is a ${age}.`
// pieces  ['That ', ' is a ', '.']
// args ['Mike', 28]
```

等同于

```js
$(['That ', ' is a ', '.'], 'Mike', 28)
```

知道了模板字符串执行参数的规则，现在将参数拼接成命令字符串

```js
function $(pieces, ...args) {
  let cmd = pieces[0]
  let i = 0
  while (i < args.length) cmd += args[i] + pieces[++i]
  console.log('cmd: ', cmd)
}
```

## exec 执行命令

```js
exec(cmd, {
  windowsHide: true,
  // Shell to execute the command with
  shell: $.shell,
  // Current working directory of the child process.
  cwd: $.cwd,
})
```

- `shell`: 执行命令的 shell
- `cwd`: 子进程的工作路径

## 校准输入输出

将子进程的标准输出写到主进程的标准输出

```js
function $(pieces, ...args) {
  let cmd = pieces[0]
  let i = 0
  while (i < args.length) cmd += args[i] + pieces[++i]

  if ($.verbose)
    console.log('$', colorize(cmd))

  return new Promise((resolve, reject) => {
    const child = exec($.prefix + cmd, {
      windowsHide: true,
      // Shell to execute the command with
      shell: $.shell,
      // Current working directory of the child process.
      cwd: $.cwd,
    })

    let stdout = ''
    child.stdout.on('data', (data) => {
      process.stdout.write(data)
      stdout += data
    })

    let stderr = ''
    child.stderr.on('data', (data) => {
      process.stderr.write(data)
      stderr += data
    })

    child.on('exit', (code) => {
      (code === 0 ? resolve : reject)({
        stdout,
        stderr,
      })
    })
  })
}
```

## 切换工作路径

判断要切换到的路径是否存在，如果不存在直接保存

```js
function cd(path) {
  if (!existsSync(path)) {
    console.error(`cd: ${path}: No such directory`)
    process.exit(1)
  }
  $.cwd = path
}
```

## 彩色打印执行的命令

```js
function colorize(cmd) {
  return cmd.replace(/^\w+\s/, (substr) => {
    return chalk.greenBright(substr)
  })
}
```

#### Reference

- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

```js
const { exec, execSync } = require('node:child_process')
const { existsSync } = require('node:fs')
const chalk = require('chalk')

function colorize(cmd) {
  return cmd.replace(/^\w+\s/, (substr) => {
    return chalk.greenBright(substr)
  })
}

function $(pieces, ...args) {
  let cmd = pieces[0]
  let i = 0
  while (i < args.length) cmd += args[i] + pieces[++i]

  if ($.verbose)
    console.log('$', colorize(cmd))

  return new Promise((resolve, reject) => {
    const child = exec($.prefix + cmd, {
      windowsHide: true,
      // Shell to execute the command with
      shell: $.shell,
      // Current working directory of the child process.
      cwd: $.cwd,
    })

    let stdout = ''
    let stderr = ''
    let combined = ''
    child.stdout.on('data', (data) => {
      if ($.verbose)
        process.stdout.write(data)
      stdout += data
      combined += data
    })
    child.stderr.on('data', (data) => {
      if ($.verbose)
        process.stderr.write(data)
      stderr += data
      combined += data
    })

    child.on('exit', (code) => {
      (code === 0 ? resolve : reject)({
        stdout,
        stderr,
        combined,
      })
    })
  })
}

// Try `command`, should cover all Bourne-like shells.
// Try `which`, should cover most other cases.
// Try `type` command, if the rest fails.
$.shell = `${execSync('command -v bash || which bash || type -p bash')}`.trim()
$.prefix = 'set -euo pipefail;'
$.verbose = true

function cd(path) {
  if (!existsSync(path)) {
    console.error(`cd: ${path}: No such directory`)
    process.exit(1)
  }
  $.cwd = path
}

module.exports = {
  $,
  cd,
  chalk,
}
```

# 进程管理

```js
import { exec, execSync } from 'node:child_process'

export function $(pieces) {
  const cmd = $.prefix + pieces[0]

  return new Promise((resolve, reject) => {
    const child = exec(cmd, {
      windowsHide: true,
      // Shell to execute the command with
      shell: $.shell,
      // Current working directory of the child process.
      cwd: undefined,
    })

    let stdout = ''
    child.stdout.on('data', (data) => {
      process.stdout.write(data)
      stdout += data
    })

    let stderr = ''
    child.stderr.on('data', (data) => {
      process.stderr.write(data)
      stderr += data
    })

    child.on('exit', (code) => {
      (code === 0 ? resolve : reject)({
        stdout,
        stderr,
      })
    })
  })
}

// Try `command`, should cover all Bourne-like shells.
// Try `which`, should cover most other cases.
// Try `type` command, if the rest fails.
$.shell = `${execSync('command -v bash || which bash || type -p bash')}`.trim()
$.prefix = 'set -euo pipefail;'

// 切换工作路径
export function cd(path) {
  if ($.verbose)
    console.log('$', colorize(`cd ${path}`))
  if (!existsSync(path)) {
    console.error(`cd: ${path}: No such directory`)
    process.exit(1)
  }
  $.cwd = path
}
```

执行 `shell` 命令

```js
$`cat package.json | grep name`
```
