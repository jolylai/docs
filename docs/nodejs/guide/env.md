# 环境变量

Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量，这些变量在构建时会被静态地替换掉。这里有一些在所有情况下都可以使用的内建变量：

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](#modes)。

- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境（使用 `NODE_ENV='production'` 运行开发服务器或构建应用时使用 `NODE_ENV='production'` ）。

- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。

## 多个环境变量

如果你的 node 项目中有多个环境变量，你也可以在你的项目根目录下创建一个 `.env `文件，然后在运行时使用 [dotenv](https://github.com/motdotla/dotenv) 包加载它们。

<!-- automd:install name="dotenv" dev -->
<!-- /automd -->

项目根目录下创建 `.env` 文件

```
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

在你的应用中，尽早导入并配置 dotenv:

```js
import 'dotenv/config'

process.env.SECRET_KEY // YOURSECRETKEYGOESHERE
```

使用 `--require (-r)` 命令行选项来预加载 `dotenv`,这样就不需要在你的代码中引入并加载 `dotenv`

```sh
node -r dotenv/config your_script.js
```

## `.env` 文件 {#env-files}

使用 [dotenv](https://github.com/motdotla/dotenv) 从你的环境目录中的下列文件加载额外的环境变量：

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

:::tip 环境加载优先级

一份用于指定模式的文件（例如 `.env.production`）会比通用形式的优先级更高（例如 `.env`）。

另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 `.env` 类文件覆盖。例如当运行 `VITE_SOME_KEY=123 vite build` 的时候。

`.env` 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。
:::

加载的环境变量也会通过 `import.meta.env` 以字符串形式暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

```[.env]
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

:::tip 环境变量解析

如上所示，`VITE_SOME_KEY` 是一个数字，但在解析时会返回一个字符串。布尔类型的环境变量也会发生同样的情况。在代码中使用时，请确保转换为所需的类型。
:::

此外，Vite 使用 [dotenv-expand](https://github.com/motdotla/dotenv-expand) 来扩展在 env 文件中编写的变量。想要了解更多相关语法，请查看 [它们的文档](https://github.com/motdotla/dotenv-expand#what-rules-does-the-expansion-engine-follow)。

请注意，如果想要在环境变量中使用 `$` 符号，则必须使用 `\` 对其进行转义。

```[.env]
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```

如果你想自定义 env 变量的前缀，请参阅envPrefix

  :::warning 安全注意事项

- `.env.*.local` 文件应是本地的，可以包含敏感变量。你应该将 `*.local` 添加到你的 `.gitignore` 中，以避免它们被 git 检入。

- 由于任何暴露给 Vite 源码的变量最终都将出现在客户端包中，`VITE_*` 变量应该不包含任何敏感信息。
  :::

## 模式 {#modes}

Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。

这是访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 development。

```js
process.env.NODE_ENV // "development"
```

在脚本运行之前将其设置为 "production"，则可告诉 Node.js 这是生产环境。

```sh
TOKEN=123456 node app.js
```

可以用相同的方式访问设置的任何自定义的环境变量。

默认情况下，开发服务器 (`dev` 命令) 运行在 `development` (开发) 模式，而 `build` 命令则运行在 `production` (生产) 模式。

这意味着当执行 `vite build` 时，它会自动加载 `.env.production` 中可能存在的环境变量：

```
# .env.production
VITE_APP_TITLE=My App
```

在你的应用中，你可以使用 `import.meta.env.VITE_APP_TITLE` 渲染标题。

在某些情况下，若想在 `vite build` 时运行不同的模式来渲染不同的标题，你可以通过传递 `--mode` 选项标志来覆盖命令使用的默认模式。例如，如果你想在 staging （预发布）模式下构建应用：

```bash
vite build --mode staging
```

还需要新建一个 `.env.staging` 文件：

```
# .env.staging
VITE_APP_TITLE=My App (staging)
```

由于 `vite build` 默认运行生产模式构建，你也可以通过使用不同的模式和对应的 `.env` 文件配置来改变它，用以运行开发模式的构建：

```
# .env.testing
NODE_ENV=development
```
