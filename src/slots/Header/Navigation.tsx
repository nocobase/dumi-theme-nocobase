import { MenuFoldOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation, useNavData } from 'dumi';
import ExternalLink from '../../common/ExternalLink';
import useAdditionalThemeConfig from '../../hooks/useAdditionalThemeConfig';
import useSiteToken from '../../hooks/useSiteToken';
import { getMoreLinksGroup } from './More';

export interface NavigationProps {
  isMobile: boolean;
  menuMode?: 'inline' | 'horizontal';
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

export default function Navigation({ isMobile, menuMode }: NavigationProps) {
  const navList = useNavData();
  const { pathname, search } = useLocation();
  const { github, moreLinks = [] } = useAdditionalThemeConfig();
  const activeMenuItem = pathname.split('/').slice(0, 2).join('/');
  // @ts-ignore
  const menuItems: MenuProps['items'] = (navList ?? []).map((navItem) => {
    const linkKeyValue = navItem.link?.split('/').slice(0, 2).join('/');
    return {
      label: <ExternalLink to={`${navItem.link}${search}`}>{navItem.title}</ExternalLink>,
      key: linkKeyValue
    };
  });

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
    ...(getMoreLinksGroup(moreLinks) || [])
  ];

  let additional: MenuProps['items'];
  if (isMobile || menuMode === 'inline') {
    additional = additionalItems;
  } else {
    additional = [
      {
        label: <MenuFoldOutlined />,
        key: 'additional',
        children: [...additionalItems]
      }
    ];
  }

  const items: MenuProps['items'] = [...(menuItems ?? []), ...(additional ?? [])];
  const mode = menuMode || (isMobile ? 'inline' : 'horizontal');
  const style = useStyle();

  return (
    <Menu
      items={items}
      mode={mode}
      css={mode === 'inline' ? style.popoverMenuNav : style.nav}
      style={{ height: '95%' }}
      selectedKeys={[activeMenuItem]}
      disabledOverflow
    />
  );
}
