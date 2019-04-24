---
title: 'taro + dva'
date: '2019-04-25'
keywords:
    - 'taro'
    - 'dva'
sidebar: 'taro'
---

> [参考项目](https://github.com/jolylai/fate/commit/11b2380313c88e1a3ea5a6dd5e3cedf588c587ad)

## 安装 dva

```bash
yarn add  dva-core dva-loading

npm i dva-core dva-loading --save
```

## 解决 redux 依赖

```bash
$ yarn add redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger
# 或者使用 npm
$ npm install --save redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger
```

## 引入异步编程依赖

```bash
$ yarn add @tarojs/async-await
# 或者使用 npm
$ npm install --save @tarojs/async-await
```

```js
// src/app.js
import '@tarojs/async-await';
```

## 创建 dva.js 文件

```js
import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
let app;
let store;
let dispatch;

function createApp(opt) {
    opt.onAction = [createLogger()];
    app = create(opt);
    app.use(createLoading({}));

    if (!global.registered) opt.models.forEach(model => app.model(model));
    global.registered = true;
    app.start();

    store = app._store;
    app.getStore = () => store;

    dispatch = store.dispatch;

    app.dispatch = dispatch;
    return app;
}

export default {
    createApp,
    getDispatch() {
        return app.dispatch;
    },
};
```

## 引入 dva

```js
//  src/app.js
import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';
import dva from './utils/dva';
import { Provider } from '@tarojs/redux';
import models from './models';

import './app.less';

const dvaApp = dva.createApp({
    initialState: {},
    models: models,
});
const store = dvaApp.getStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById('app'));
```

## 创建 modal

```js
//  src/models/index.js
import common from './common';

export default [common];
```

```js
//  src/models/common.js
export default {
    namespace: 'common',
    state: {
        list: [],
    },

    effects: {},

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
```
