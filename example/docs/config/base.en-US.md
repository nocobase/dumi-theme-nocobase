---
nav:
  title: config
  order: 2
title: Base
---

`dumi-theme-antd` 为了更好地管理主题特有字段，将所有主题相关配置项存于 `themeConfig.antdTheme` 字段中，具体配置字段如下：

## 基础配置

### github

- 类型：`string`
- 默认值：`null`

导航栏 Github 图标链接，如不配置该字段，则不展示。

### localesEnhance

- 类型：`ILocaleEnhance[]`
- 默认值：`dumi-theme-antd`

```ts
interface ILocaleEnhance {
  /** 同 themeConfig 中 locales 项中的 id */
  id: string;
  /** 当多语言只有两项时用于展示切换的前缀 */
  switchPrefix: string;
}
```

导航头部多语言切换前缀图标展示，只适用于两种多语言的情况。

### title

- 类型：`string`
- 默认值：`Dumi Theme AntD`

配置首页首屏区域的大标题。

### description

- 类型：`string`
- 默认值：`null`

配置首页首屏区域的简介文字。

### actions

- 类型：`IAction[] | Record<string, IAction[]>`
- 默认值：`null`

```ts
interface IAction {
  /** 按钮文字描述 */
  text: string;
  /** 按钮链接 */
  link: string;
  /** 按钮类型 */
  type?: 'primary' | 'default';
}

// 单语言时配置数组即可
actions: [{ type: 'primary', text: '开始使用', link: '/guide/introduce' }]
// 多语言时配置对象，key 为语言名
actions: {
  'zh-CN': [{ type: 'primary', text: '开始使用', link: '/guide/introduce' }],
  'en-US': [{ type: 'primary', text: 'Start', link: '/guide/introduce-en' }],
},
```

配置首页首屏区域的操作按钮。

### features

- 类型：`IFeature[] | Record<string, IFeature[]>`
- 默认值：`null`

```ts
interface IFeature {
  /** 特性名称 */
  title: string;
  /** 特性具体描述 */
  details: string;
}
// 单语言时配置数组即可
features: [{ title: '开箱即用'}, { details: '接入简单，安装即使用，全面融入 Ant Design 5.0 风格。'}]
// 多语言时配置对象，key 为语言名
features: {
  'zh-CN': [{ title: '开箱即用'}, { details: '接入简单，安装即使用，全面融入 Ant Design 5.0 风格。'}],
  'en-US': [{ title: 'Simple Use'}, { details: 'Simple access, installation and use, fully integrated into Ant Design 5.0 style.'}],
},
```

配置后该页面将会以首页形式呈现，用于每行 3 个的形式展示组件库的特性。

### sidebarGroupModePath

- 类型：`Array<string | RegExp>`
- 默认值：`[]`

```ts
export default {
  themeConfig: {
    antdTheme: {
      sidebarGroupModePath: [
        // 匹配以 /config 开头的路由
        '/config',
        // 支持正则匹配
        /\/guide\//,
      ],
    },
  },
};
```

左侧导航栏是否需要作为分组处理，参考 antd [menuitemgrouptype][antd-menuitemgrouptype-url]。

[antd-menuitemgrouptype-url]: https://ant.design/components/menu-cn#menuitemgrouptype