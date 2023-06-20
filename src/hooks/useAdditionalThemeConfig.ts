// 获取 dumi-theme-nocobase 额外的配置
import { useSiteData } from 'dumi';

import type { IAdditionalThemeConfig } from '../types';

const useAdditionalThemeConfig = () => {
  const { themeConfig } = useSiteData();
  const additionalThemeConfig: IAdditionalThemeConfig = themeConfig;

  return additionalThemeConfig;
};

export default useAdditionalThemeConfig;
