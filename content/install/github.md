---
title: "Github"
keywords:
    - Github
    - gh-page
---

This guide is for installing a local development copy of Ghost from source, primarily for the purpose of modifying Ghost core

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
git remote set-url origin <new url>
```

---

## gh-pages

```bash
# 将 `docs/.vuepress/dist` 推送到 gh-pages 分支
git subtree push --prefix docs/.vuepress/dist origin gh-pages
```

---

## SSH key

```bash
# 生成 key
ssh-keygen -t rsa -C "your.email@example.com" -b 4096

# 将 key 复制到黏贴板

# Git Bash on Windows / Windows PowerShell
cat ~/.ssh/id_rsa.pub | clip

# macOS
pbcopy < ~/.ssh/id_rsa.pub

# Linux
xclip -sel clip < ~/.ssh/id_rsa.pub

# Windows
type %userprofile%\.ssh\id_rsa.pub | clip
```
