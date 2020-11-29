import React, { PureComponent } from "react";
import classNames from 'classnames';

import { IBooleanAction } from '@redux/models';
import { IWPMenu, IMenuItem } from '@srcTypes/models';

import NavItem from '@client/components/NavItem/NavItem';

import { sizeOf } from '@common/utils/core.util';

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
    return (
      <NavItem
        key={menuItem.id}
        to={menuItem.route}
      >
        {menuItem.title}
      </ NavItem>
    )
  }

  renderSubMenu(menuLinks: Array<IMenuItem>) {
    const menuComponent: any = menuLinks.map((menuItem: IMenuItem) => (
      <ul
        className="menu-mobile-submenu"
        key={menuItem.id}
      >
        {this.renderMenuItem(menuItem)}
        {menuItem.menu && sizeOf(menuItem.menu) > 0 && this.renderSubMenu(menuItem.menu)}
      </ul>
    ));

    return menuComponent;
  }

  render() {
    const { menu, mobileMenuVisible } = this.props;

    const mobileMenuClass = classNames('mobile-menu', {
      'active': mobileMenuVisible,
    });
    const menuClass = classNames('menu-mobile', {
      'menu-open': mobileMenuVisible,
    });

    return (
      <div className={mobileMenuClass}>
        <button className="icon-burger" onClick={this._toggleMenuVisible}>{'☰'}</button>
        <div className={menuClass}>
          {menu && this.renderSubMenu(menu.menu)}
        </div>
      </div>
    )
  }
}

export default MobileMenu;
