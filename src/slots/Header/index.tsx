import { MenuOutlined } from '@ant-design/icons';
import { ClassNames, css } from '@emotion/react';
import { Alert, Col, Popover, Row, Select } from 'antd';
import classNames from 'classnames';
import { useLocation, useSiteData } from 'dumi';
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';
import React, { useCallback, useContext, useEffect, useState, type FC } from 'react';
// eslint-disable-next-line import/no-unresolved
import LangSwitch from 'dumi/theme/slots/LangSwitch';
import useAdditionalThemeConfig from '../../hooks/useAdditionalThemeConfig';
import useSiteToken from '../../hooks/useSiteToken';
import type { SiteContextProps } from '../SiteContext';
import SiteContext from '../SiteContext';
import HeaderExtra from './HeaderExtral';
import Logo from './Logo';
import More from './More';
import Navigation from './Navigation';

interface HeaderState {
  windowWidth: number;
  menuVisible: boolean;
}
export type IResponsive = 'large' | 'medium' | 'small';

const RESPONSIVE_LG = 1200;
const RESPONSIVE_MD = 1120;

const colPropsHome = [
  {
    flex: 'none'
  },
  {
    flex: 'auto'
  }
];
const _colProps = [
  {
    xxl: 4,
    xl: 5,
    lg: 6,
    md: 6,
    sm: 24,
    xs: 24
  },
  {
    xxl: 20,
    xl: 19,
    lg: 18,
    md: 18,
    sm: 0,
    xs: 0
  }
];

const useStyle = () => {
  const { token } = useSiteToken();
  const searchIconColor = '#ced4d9';

  return {
    header: css`
      position: relative;
      z-index: 10;
      max-width: 100%;
      background: ${token.colorBgContainer};
      box-shadow:
        0 1px 2px 0 rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
      border-bottom: 0;
      padding-right: 20px; /* 添加右侧内边距 */

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        text-align: center;
      }

      .nav-search-wrapper {
        display: flex;
        flex: auto;
        margin-left: 20px;
      }

      .dumi-default-search-bar {
        border-inline-start: 1px solid rgba(0, 0, 0, 0.06);

        > svg {
          width: 14px;
          fill: ${searchIconColor};
        }

        > input {
          height: 22px;
          border: 0;

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${searchIconColor};
          }
        }

        .dumi-default-search-shortcut {
          color: ${searchIconColor};
          background-color: rgba(150, 150, 150, 0.06);
          border-color: rgba(100, 100, 100, 0.2);
          border-radius: 4px;
        }

        .dumi-default-search-popover {
          inset-inline-start: 11px;
          inset-inline-end: unset;

          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
        }
      }
    `,
    menuRow: css`
      display: flex !important;
      align-items: center;
      margin: 0;

      > * {
        flex: none;
        margin: 0 12px 0 0;

        &:last-child {
          margin-right: 40px;
        }
      }

      ${token.antCls}-row-rtl & {
        > * {
          &:last-child {
            margin-right: 12px;
            margin-left: 40px;
          }
        }
      }
    `,
    popoverMenu: {
      width: 300,

      [`${token.antCls}-popover-inner-content`]: {
        padding: 0
      }
    }
  };
};

const Header: FC = () => {
  const { isMobile } = useContext<SiteContextProps>(SiteContext);
  const [headerState, setHeaderState] = useState<HeaderState>({
    windowWidth: 1400,
    menuVisible: false
  });
  const location = useLocation();
  const { docVersions } = useAdditionalThemeConfig();
  const {
    themeConfig: { alert }
  } = useSiteData();

  const onWindowResize = useCallback(() => {
    setHeaderState((prev) => ({
      ...prev,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
    }));
  }, []);
  const handleHideMenu = useCallback(() => {
    setHeaderState((prev) => ({
      ...prev,
      menuVisible: false
    }));
  }, []);
  const onMenuVisibleChange = useCallback((visible: boolean) => {
    setHeaderState((prev) => ({
      ...prev,
      menuVisible: visible
    }));
  }, []);

  const handleVersionChange = useCallback((url: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  }, []);

  useEffect(() => {
    handleHideMenu();
  }, [location, handleHideMenu]);

  useEffect(() => {
    onWindowResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onWindowResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onWindowResize);
      }
    };
  }, [onWindowResize]);

  const { pathname } = location;
  const isHome = ['', 'index', 'index-cn'].includes(pathname);
  const { windowWidth, menuVisible } = headerState;
  const style = useStyle();
  const headerClassName = classNames({
    clearfix: true,
    'home-header': isHome
  });

  let responsive: IResponsive = 'large';
  if (windowWidth < RESPONSIVE_MD) {
    responsive = 'small';
  } else if (windowWidth < RESPONSIVE_LG) {
    responsive = 'medium';
  }

  const navigationNode = (
    <Navigation
      key="nav"
      isMobile={isMobile}
      menuMode={responsive === 'large' ? 'horizontal' : 'inline'}
    />
  );

  let menu: React.ReactNode;

  if (responsive === 'large') {
    const versionOptions = Object.keys(docVersions ?? {}).map((version) => ({
      value: docVersions?.[version],
      label: version
    }));
    menu = (
      <>
        {navigationNode}
        {versionOptions.length > 0 && (
          <Select
            key="version"
            size="small"
            defaultValue={versionOptions[0]?.value}
            onChange={handleVersionChange}
            popupMatchSelectWidth={false}
            getPopupContainer={(trigger) => trigger.parentNode}
            options={versionOptions}
          />
        )}
        <More key="more" />
        <HeaderExtra key="header-Extra" />
        <LangSwitch key={new Date().getTime()} />
      </>
    );
  } else {
    menu = navigationNode;
  }

  const colProps = isHome ? colPropsHome : _colProps;

  return (
    <div>
      <header css={style.header} className={headerClassName}>
        <Row
          style={{ height: 64 }}
          align="middle"
          justify="space-between"
          wrap={false} // 防止列换行
        >
          {/* Logo 部分，保持不变 */}
          <Col {...colProps[0]} flex="none" style={{ marginLeft: 15 }}>
            <Logo />
          </Col>

          {/* 搜索框部分 */}
          <Col
            flex="auto"
            style={{
              padding: responsive !== 'large' ? '0 8px' : undefined // 中小尺寸适当缩小左右内边距
            }}
          >
            <div className="nav-search-wrapper">
              <DumiSearchBar />
            </div>
          </Col>

          {/* 菜单和语言切换部分 */}
          <Col
            flex="none"
            css={responsive === 'large' ? style.menuRow : undefined} // 正确应用 css 属性
            style={{
              display: 'flex',
              alignItems: 'center',
              ...(responsive !== 'large'
                ? {
                    width: 120,
                    height: 50
                  }
                : {})
            }}
          >
            {responsive !== 'large' ? (
              <>
                <div style={{ width: 80 }}>
                  {/* 菜单图标 */}
                  <ClassNames>
                    {({ css: cssFn }) => (
                      <Popover
                        overlayClassName={cssFn(style.popoverMenu)}
                        placement="bottomRight"
                        content={menu}
                        trigger="click"
                        open={menuVisible}
                        arrow
                        onOpenChange={onMenuVisibleChange}
                      >
                        <MenuOutlined
                          className="nav-phone-icon"
                          style={{ display: 'flex', width: 50, height: 1, fontSize: 20 }}
                        />
                      </Popover>
                    )}
                  </ClassNames>
                </div>
                {/* 语言切换 */}
                <div style={{ display: 'flex' }}>
                  <LangSwitch key="lang-switch" />
                </div>
              </>
            ) : (
              // 大尺寸下，显示完整菜单
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>{menu}</>
            )}
          </Col>
        </Row>
      </header>
      {alert && (
        <Alert
          style={{ textAlign: 'center' }}
          message={<div dangerouslySetInnerHTML={{ __html: alert }} />}
          banner
          showIcon={false}
          type="warning"
        />
      )}
    </div>
  );
};

export default Header;
