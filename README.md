<h1 align="center">dumi-theme-nocobase</h1>

<div align="center">

AntD site theme package for the [dumi](https://d.umijs.org) framework fork from [dumi-theme-antd](https://github.com/KuangPF/dumi-theme-antd).

[![NPM version](https://img.shields.io/npm/v/dumi-theme-nocobase.svg?style=flat)](https://npmjs.org/package/dumi-theme-nocobase) [![NPM downloads](http://img.shields.io/npm/dm/dumi-theme-nocobase.svg?style=flat)](https://npmjs.org/package/dumi-theme-nocobase) [![Deploy](https://github.com/nocobase/dumi-theme-nocobase/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/nocobase/dumi-theme-nocobase/actions/workflows/gh-pages.yml)

</div>

<p align="center">
  <a href="https://kuangpf.com/dumi-theme-nocobase">
    <img  src="https://user-images.githubusercontent.com/20694238/221604020-d797a64e-30b5-4e4c-897d-112c8ee37512.png">
  </a>
</p>

## Usage

```bash
npm install dumi-theme-nocobase -D
```

`.dumirc.ts` config:

```ts
import { defineConfig } from 'dumi';
import { defineThemeConfig } from 'dumi-theme-nocobase';

export default defineConfig({
  // ....
  themeConfig: defineThemeConfig({})
});
```

## Develop

### Install & Run

```bash
git clone https://github.com/nocobase/dumi-theme-nocobase
npm install
yarn docs
```

### link to your project

if you want to use this theme in your project and you want fix bug, you can link to your project.

```bash
yarn dev # watch model
yarn link # link to global
cd your-project && yarn link dumi-theme-nocobase # link to your project
```

### Publish to npm

1. change `package.json` version
2. change `example/docs/guide/changelog.zh-CN.md` add changelog
3. add [new release](https://github.com/nocobase/dumi-theme-nocobase/releases/new) version, and CI will publish to npm

## LICENSE

MIT
