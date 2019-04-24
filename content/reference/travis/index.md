---
title: 'Travis CI'
date: '2019-01-09'
meta_title: 'Travis CI'
meta_description: "Continuous Integration"
keywords:
    - 'Travis'
    - '持续集成'
sidebar: 'travis'
---

Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码"集成"到主干。

持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更，而不是在开发周期结束时，一下子合并一大块代码。

## 生命周期

```bash
before_install
install
before_script
script
aftersuccess or afterfailure
[OPTIONAL] before_deploy
[OPTIONAL] deploy
[OPTIONAL] after_deploy
after_script
```

## 运行状态

```
passed：运行成功，所有步骤的退出码都是0
canceled：用户取消执行
errored：before_install、install、before_script有非零退出码，运行会立即停止
failed ：script有非零状态码 ，会继续运行
```