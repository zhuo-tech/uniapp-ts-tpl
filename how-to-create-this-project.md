---
title: 创建 uni-app 项目 - 配置 Typescript + Eslint + Husky
date: 2021-04-19 11:44:57
tags:
categories:
---
## 前置要求
  1. 安装 Node.js (版本要求 >= 14, 高版本的 npm 安装依赖效率高，不容易出错)

## 需求
  1. 使用 typescript 开发 uni-app
  2. 基于 vscode & npm script 运行 uni-app，不依赖 HBuilderX
  3. 配置 eslint 进行代码约束
  4. 配置 husky 对代码的提交和推送进行约束: 提交前 eslint fix

## 步骤

### 使用 Vue Cli 创建项目

安装 vue-cli
> @see https://cli.vuejs.org/zh/

```
npm install -g @vue/cli
```

创建 uni-app 项目
```
vue create -p dcloudio/uni-preset-vue my-project

# 选择 TypeScript 模板
```

运行项目
```
npm run serve
```

### 配置支持 scss (node-sass & sass-loader)

> uni-app 暂不支持高版本的 sass，使用以下版本组合

```
  npm i node-sass@4.14.1 sass-loader@7.3.1 -D
```


### 配置支持 husky 提交约束

```sh
npm i lint-staged@8.1.5 husky -D
npx husky init
npx husky install
```

然后，添加 lint-staged 配置到 package.json中：
```json
{
  // ...
  "lint-staged": {
    "src/**/*.{js,ts,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

将以下脚本添加到 .husky/pre-commit 中：
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo 'pre-commit'
npx lint-staged
npm run fix
```

将以下脚本添加到 .husky/pre-push 中：
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
```


### 配置支持 eslint 约束

> @see https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md

```sh
npm i eslint -D
npm i @vue/eslint-config-typescript eslint-plugin-vue -D

# for typescript-eslint
npm i typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

# for prettier
npm i eslint-config-prettier eslint-plugin-prettier -D
```

Next, create a .eslintrc.js config file in the root of your project, and populate it with the following:
```js
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    uni: true,
    plus: true,
    uniCloud: true,
    wx: true,
    TcPlayer: true,
    WeixinJSBridge: true,
    weex: true
  },
  rules: {
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/no-unused-components': [
      2,
      {
        ignoreWhenBindingPresent: true
      }
    ],
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: false, htmlWhitespaceSensitivity: 'ignore' }
    ]
  }
}
```

Next, create a .eslintignore file in the root of your project. This file will tell ESLint which files and folders it should never lint.

Add the following lines to the file:

```sh
# don't ever lint node_modules
node_modules
# don't lint build output (make sure it's set to your correct build folder name)
dist
# don't lint nyc coverage output
coverage
```

最后，添加 npm 命令：
```json
scripts: [
  "lint": "npx eslint src --ext .js,.jsx,.ts,.tsx,.vue",
  "fix": "npx eslint src --fix --ext .js,.jsx,.ts,.tsx,.vue"
]
```