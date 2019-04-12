---
title: "Git"
keywords:
    - Git
---

## [Commit 规范](https://yanhaijing.com/git/2016/02/17/my-commit-message/)

### Header ⭐️

```
<type>:<subject>
```

::: tip Header 书写规范
type 用于说明 commit 的类别，可以使用如下类别：

-   feat：新功能（feature）
-   fix：修补 bug
-   doc：文档（documentation）
-   style： 格式（不影响代码运行的变动）
-   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
-   test：增加测试
-   chore：构建过程或辅助工具的变动

subject 是 commit 目的的简短描述。

-   以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
-   第一个字母小写
-   结尾不加句号（。）
    :::

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

### Footer

Footer 部分只用于两种情况：

-   关联 Issue
-   关闭 Issue

### 示例

```git
feat: 添加了分享功能

给每篇博文添加了分享功能

- 添加分享到微博功能
- 添加分享到微信功能
- 添加分享到朋友圈功能

Issue #1, #2
Close #1
```
