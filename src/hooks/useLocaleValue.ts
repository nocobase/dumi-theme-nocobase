import { useLocale, useSiteData } from 'dumi';
import type { IAdditionalThemeConfig } from '../types';

export default function useLocaleValue(key: string) {
  const { themeConfig } = useSiteData();
  const locale = useLocale();

  const additionalThemeConfig: IAdditionalThemeConfig = themeConfig;
  const value = additionalThemeConfig[key];
  return typeof value === 'string' ? value : value?.[locale.id];
}
