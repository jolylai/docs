---
title: 'config'
date: '2019-04-16'
meta_title: 'Prettier'
meta_description: "Prettier config 👉"
keywords:
    - 'Prettier'
---
The pluggable linting utility for JavaScript and JSX
## 什么是 `Prettier`


## 配置文件
### .prettierrc
```js
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
```
---

### .prettierignore 

```
package.json
gatsby/**
```
