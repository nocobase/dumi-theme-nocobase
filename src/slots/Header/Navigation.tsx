import { MenuFoldOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocale, useLocation, useNavData, useSiteData } from 'dumi';
import { ILocale, ILocalesConfig } from 'dumi/dist/client/theme-api/types';
import { useCallback } from 'react';
import ExternalLink from '../../common/ExternalLink';
import useAdditionalThemeConfig from '../../hooks/useAdditionalThemeConfig';
import useSiteToken from '../../hooks/useSiteToken';
import { ILocaleEnhance } from '../../types';
import { getTargetLocalePath } from '../../utils';
import { getMoreLinksGroup } from './More';
import { type IResponsive } from './index';

export interface NavigationProps {
  isMobile: boolean;
  responsive: IResponsive;
}

const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls, iconCls, fontFamily, headerHeight, menuItemBorder, colorPrimary } = token;

  return {
    nav: css`
      height: 100%;
      font-size: 14px;
      font-family: Avenir, ${fontFamily}, sans-serif;
      border: 0;

      &${antCls}-menu-horizontal {
        border-bottom: none;

        & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
          min-width: (40px + 12px * 2);
          height: ${headerHeight}px;
          padding-right: 12px;
          padding-left: 12px;
          line-height: ${headerHeight}px;

          &::after {
            top: 0;
            right: 12px;
            bottom: auto;
            left: 12px;
            border-width: ${menuItemBorder}px;
          }
        }

        & ${antCls}-menu-submenu-title ${iconCls} {
          margin: 0;
        }

        & > ${antCls}-menu-item-selected {
          a {
            color: ${colorPrimary};
          }
        }
      }

      & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
        text-align: center;
      }
    `,
    popoverMenuNav: css`
      ${antCls}-menu-item,
      ${antCls}-menu-submenu {
        text-align: left;
      }

      ${antCls}-menu-item-group-title {
        padding-left: 24px;
      }

      ${antCls}-menu-item-group-list {
        padding: 0 16px;
      }

      ${antCls}-menu-item,
      a {
        color: #333;
      }
    `
  };
};

function getNextLang(locale: ILocale, locales: ILocalesConfig, localesEnhance?: ILocaleEnhance[]) {
  const changeLangByHostname = localesEnhance && localesEnhance.every((item) => item.hostname);
  if (
    typeof window !== 'undefined' &&
    changeLangByHostname &&
    window.location.hostname !== 'localhost'
  ) {
    const nextLocaleEnhance = localesEnhance.find(
      (item) => item.hostname !== window.location.hostname
    );
    if (nextLocaleEnhance) {
      const nextLang = locales.find((item) => item.id === nextLocaleEnhance.id);
      if (nextLang) {
        return {
          ...nextLang,
          nextPath: window.location.href.replace(
            window.location.hostname,
            nextLocaleEnhance.hostname!
          )
        };
      }
    }
  }

  const nextLang = locales.filter((item) => item.id !== locale.id)[0];
  const nextPath = getTargetLocalePath({
    current: locale,
    target: nextLang
  });
  return {
    ...nextLang,
    nextPath
  };
}

export default function Navigation({ isMobile, responsive }: NavigationProps) {
  // 统一使用 themeConfig.nav，使用 useNavData，当存在自定义 pages 时，会导致 nav 混乱
  const navList = useNavData();

  const { pathname, search } = useLocation();
  const { locales } = useSiteData();
  const locale = useLocale();
  const { github, moreLinks = [], localesEnhance } = useAdditionalThemeConfig();
  const activeMenuItem = pathname.split('/').slice(0, 2).join('/');
  // @ts-ignore
  const menuItems: MenuProps['items'] = (navList ?? []).map((navItem) => {
    const linkKeyValue = navItem.link?.split('/').slice(0, 2).join('/');
    return {
      label: <ExternalLink to={`${navItem.link}${search}`}>{navItem.title}</ExternalLink>,
      key: linkKeyValue
    };
  });

  // 获取小屏幕下多语言导航栏节点
  const getLangNode = useCallback(() => {
    if (locales.length < 2) {
      return null;
    }
    if (locales.length === 2) {
      const nextLang = getNextLang(locale, locales, localesEnhance);
      return {
        label: (
          <a rel="noopener noreferrer" href={nextLang.nextPath}>
            {nextLang.name}
          </a>
        ),
        key: nextLang.id
      };
    }
    return {
      label: <span>{locale.name}</span>,
      key: 'multi-lang',
      children: locales
        .filter((item) => item.id !== locale.id)
        .map((item) => {
          const nextPath = getTargetLocalePath({
            current: locale,
            target: item
          });
          return {
            label: (
              <a rel="noopener noreferrer" href={nextPath}>
                {item.name}
              </a>
            ),
            key: item.id
          };
        })
    };
  }, [locale, locales, localesEnhance]);

  let additional: MenuProps['items'];
  const additionalItems: MenuProps['items'] = [
    github
      ? {
          label: (
            <a rel="noopener noreferrer" href={github} target="_blank">
              GitHub
            </a>
          ),
          key: 'github'
        }
      : null,
    getLangNode(),
    ...(getMoreLinksGroup(moreLinks) || [])
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = [
      {
        label: <MenuFoldOutlined />,
        key: 'additional',
        children: [...additionalItems]
      }
    ];
  }
  const items: MenuProps['items'] = [...(menuItems ?? []), ...(additional ?? [])];
  const menuMode = isMobile ? 'inline' : 'horizontal';
  const style = useStyle();
  return (
    <Menu
      items={items}
      mode={menuMode}
      css={style.nav}
      style={{ height: '95%' }}
      selectedKeys={[activeMenuItem]}
      disabledOverflow
    />
  );
}
