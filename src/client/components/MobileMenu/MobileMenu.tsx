import React, { PureComponent } from "react";
import classNames from 'classnames';

import { IBooleanAction } from '@redux/models';
import { IWPMenu, IMenuItem } from '@srcTypes/models';

import NavItem from '@client/components/NavItem/NavItem';

import { sizeOf } from '@common/utils/core.util';
import { isActiveRoute } from '@utils/url.util';

interface IOwnProps {
  menu: IWPMenu;
  mobileMenuVisible: Boolean;
  handleUiMobileMenuVisible: (isVisible: boolean) => IBooleanAction;
}

type TAllProps = IOwnProps;

class MobileMenu extends PureComponent<TAllProps> {
  _toggleMenuVisible = () => {
    const { mobileMenuVisible, handleUiMobileMenuVisible } = this.props;
    handleUiMobileMenuVisible(!mobileMenuVisible);
  }

  renderMenuItem(menuItem: IMenuItem) {
    const menuClass = classNames('menu-nav-link', {
      'menu-nav-link-active': isActiveRoute(menuItem.route),
    });

    return (
      <NavItem
        id={menuItem.id}
        to={menuItem.route}
        contentClass={menuClass}
      >
        {menuItem.title}
      </NavItem>
    )
  }

  renderSubMenu(menuLinks: Array<IMenuItem>, key: number) {
    const menuComponent: any = menuLinks.map((menuItem: IMenuItem, index: number) => (
        <React.Fragment key={`${key}-${index}`}>
          {this.renderMenuItem(menuItem)}
          {menuItem.menu && sizeOf(menuItem.menu) > 0 && this.renderSubMenu(menuItem.menu, menuItem.id)}
        </React.Fragment>
      )
    );

    const submenuClass = classNames('mobile-menu-submenu', {
      'mobile-menu-submenu-root': key === -1,
    });

    return menuLinks && sizeOf(menuLinks) > 0
      ? (
        <ul
          className={submenuClass}
          key={key}
        >
          {menuComponent}
        </ul>
      )
      : null;
  }

  render() {
    const { menu, mobileMenuVisible } = this.props;

    // TODO - check if on mobile
    const mobileMenuClass = classNames('mobile-menu', {
      'mobile-menu-hidden': false, //  !isMobile,
      'mobile-menu-open': mobileMenuVisible, //  !isMobile,
    });

    const menuClass = classNames('menu-list', {
      'menu-list-open': mobileMenuVisible,
    });

    return (
      <div className={mobileMenuClass}>
        <div
          key="menu-list"
          className={menuClass
        }>
          {menu && this.renderSubMenu(menu.menu, -1)}
        </div>
        <button
          key="icon-burger"
          className="icon-burger"
          onClick={this._toggleMenuVisible}
        >
          {'☰'}
        </button>
      </div>
    )
  }
}

export default MobileMenu;
