# 快速开始

## Node.js 版本管理

NVM（Node Version Manager）允许您通过命令行快速安装和使用不同版本的Node.js。它是一个非常有用的工具，特别是当您需要在不同的项目中使用不同版本的Node.js时。

```sh
# 查看
$ nvm ls

# 安装需要的 node 版本
nvm install v16.19.1

# 切换 node 版本
nvm use v16.19.1

# 设置默认的 node 版本
nvm alias default v16.19.1
```

Mac/Linux 使用以下命令安装 [NVM](https://github.com/nvm-sh/nvm)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

::: tip 注意
windows 用户下载 [nvm-setup.exe](https://github.com/coreybutler/nvm-windows/releases) 并安装
:::

### 更换镜像源

由于 nvm 默认的下载地址 http://nodejs.org/dist/ 是外国外服务器，国内下载很慢，可以使用淘宝的镜像来加速下载

Mac/Linux 使用一下命令

```sh
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
```

windows 可修改 nvm 的安装路径把上的 `settings.txt` 文件（默认安装路径 `C:\Users\用户\AppData\Roaming\nvm`）

```
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

## 参考资料

- [nestjs-boilerplate](https://github.com/brocoders/nestjs-boilerplate)
- [earthworm](https://github.com/cuixueshe/earthworm)
- [crm](https://github.com/kuangshp/nestjs-mysql-api)
