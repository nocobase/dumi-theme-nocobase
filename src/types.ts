import type { SerializedStyles } from '@emotion/react';
import { type IThemeConfig } from 'dumi/dist/client/theme-api/types';

export type ISidebarGroupModePathItem = string | RegExp;

interface ILocaleEnhance {
  /** 同 themeConfig 中 locales 项中的 id */
  id: string;
  /** 当多语言只有两项时用于展示切换的前缀 */
  switchPrefix: string;
}

interface IAction {
  /** 按钮文字描述 */
  text: string;
  /** 按钮链接 */
  link: string;
  /** 按钮类型 */
  type?: 'primary' | 'default';
}

interface IMoreLink {
  /** 链接文字描述 */
  text: string;
  /** 链接 */
  link: string;
}

interface IFeature {
  /** 特性名称 */
  title: string;
  /** 特性具体描述 */
  details: string;
  /** css in js 样式 */
  itemCss?: SerializedStyles;
}

// 分组类型，将 children 换位字符串数组

export type SidebarEnhanceItemType = {
  title: string;
  link: string;
  target?: string;
};

export type SidebarEnhanceChildrenType = string | SidebarEnhanceItemType;
export type SidebarEnhanceSubType = {
  children: SidebarEnhanceChildrenType[];
  title: string;
};

// 增强模式的 sidebar 相关类型
export type SidebarEnhanceGroupChildren = (SidebarEnhanceSubType | SidebarEnhanceChildrenType)[];
export type SidebarEnhanceGroupType = {
  type: 'group';
  title: string;
  children: SidebarEnhanceGroupChildren;
};
export type SidebarEnhanceType =
  | SidebarEnhanceSubType
  | SidebarEnhanceGroupType
  | SidebarEnhanceChildrenType;
export type SidebarEnhanceItems = SidebarEnhanceType[];

interface IDocVersion {
  [propName: string]: string;
}

export interface IBannerConfig {
  /** 是否展示头部 banner 背景 */
  showBanner?: boolean;
  /** banner 图片地址 */
  bannerImgUrl?: string;
  /** banner 移动端图片地址 */
  bannerMobileImgUrl?: string;
}

interface IAdditionalThemeConfig extends Omit<IThemeConfig, 'prefersColor' | 'socialLinks'> {
  // 不知道为什么继承 IThemeConfig 的类型不生效，所以这里直接写了
  name?: IThemeConfig['name'];
  logo?: IThemeConfig['logo'];
  nav?: IThemeConfig['nav'];
  sidebar?: IThemeConfig['sidebar'];
  footer?: IThemeConfig['footer'];
  showLineNum?: IThemeConfig['showLineNum'];
  prefersColor?: IThemeConfig['prefersColor'];
  nprogress?: IThemeConfig['nprogress'];
  // https://github.com/umijs/dumi/pull/1694
  socialLinks?: Partial<IThemeConfig['socialLinks']>;

  /** github 链接 */
  github?: string;
  /** 左上角点击后的链接，默认是首页 */
  homeLink?: string;
  /** 多语言额外配置，主要用于展示语言切换文字（只针对于两项多语言时） */
  localesEnhance?: ILocaleEnhance[];
  /** 配置首页首屏区域的大标题。 */
  title?: string | Record<string, string>;
  /** 配置首页首屏区域的简介文字 */
  description?: string | Record<string, string>;
  /** 配置首页首屏区域的操作按钮 */
  actions?: IAction[] | Record<string, IAction[]>;
  /** 配置首页特性描述 */
  features?: IFeature[] | Record<string, IFeature[]>;
  /** sidebar group 模式路由 */
  sidebarGroupModePath?: true | ISidebarGroupModePathItem[];
  /** 文档版本 */
  docVersions?: IDocVersion;
  /** 更多链接 */
  moreLinks?: IMoreLink[];
  /** banner 配置 */
  bannerConfig?: IBannerConfig;
  /** 增强模式的 sidebar */
  sidebarEnhance?: Record<string, SidebarEnhanceItems>;
}

export { IAdditionalThemeConfig, ILocaleEnhance, IFeature, IAction };
