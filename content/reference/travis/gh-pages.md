---
title: "GitHub Pages Deployment"
date: "2019-04-12"
keywords:
    - "travis"
    - "gh-pages"
---

使用 `travis`[👉](https://docs.travis-ci.com/user/deployment/pages/) 去自动化部署项目到 `gh-pages` 上，这样当你修改完项目后，将代码上传到 github 上时，就能将最新的代码自动发布到 `gh-pages` 上

## 配置文件

项目根路径下创建 `travis.yml` 文件

```yml
language: node_js
node_js: stable
branches:
    only:
        - master
install:
    - npm install
script:
    - npm run build
deploy:
    provider: pages
    skip-cleanup: true
    github-token: $GITHUB_TOKEN
    keep-history: true
    local_dir: public
    on:
        branch: master
```
