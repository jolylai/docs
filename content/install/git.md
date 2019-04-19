---
title: "Git"
keywords:
    - Git
---
Git是目前世界上最先进的分布式版本控制系统。记录一些在实际开发中比较实用且容易忘记的命令

## 首次提交

```bash
  echo "# NoteBook" >> README.md
  git init
  git add .
  git commit -m "first commit"
  git remote add origin https://github.com/jolylai/notebook.git
  git push -u origin master
```

---

## 修改远程地址

```bash
# git remote set-url origin https://github.com/jolylai/notebook.git
git remote set-url origin <new url>

```

## 版本回退
```bash
# 回退到上一个版本
git reset --hard HEAD^

# 回退到上上一个版本
git reset --hard HEAD^^

# 版本库的状态
git log

commit e475afc93c209a690c39c13a46716e8fa000c366 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    wrote a readme file

# 回到指定版本
# 版本号没必要写全，前几位就可以了，Git会自动去找。
# 当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。
git reset --hard 1094a

# 强制提交
git push -f -u origin master
```
---

## Commit 规范
> [Commit 规范](https://yanhaijing.com/git/2016/02/17/my-commit-message/)
### 格式
```
<Header>

<Body>

<Footer>
```
### 示例

```git
<!-- header -->
feat: 添加了分享功能

<!-- body -->
给每篇博文添加了分享功能

- 添加分享到微博功能
- 添加分享到微信功能
- 添加分享到朋友圈功能

<!-- footer -->
Issue #1, #2
Close #1
```
### Header ⭐️
-   feat：新功能（feature）
-   fix：修补 bug
-   doc：文档（documentation）
-   style： 格式（不影响代码运行的变动）
-   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
-   test：增加测试
-   chore：构建过程或辅助工具的变动
> 也可使用[Gitmoji](https://gitmoji.carloscuesta.me/)添加emoji

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。

### Footer

Footer 部分只用于两种情况：

-   关联 Issue
-   关闭 Issue


