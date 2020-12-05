import React, { FC } from "react";

import { IBooleanAction } from '@redux/models';
import MobileMenu from '@client/components/MobileMenu/MobileMenu';

import { IWPMenu } from '@srcTypes/models';

type TAllProps = {
  menu: IWPMenu;
  mobileMenuVisible: Boolean;
  handleUiMobileMenuVisible: (isVisible: boolean) => IBooleanAction;
};

const Menu: FC<TAllProps> = (props: TAllProps) => {
  const { menu, mobileMenuVisible, handleUiMobileMenuVisible } = props;

  return (
    <MobileMenu
      menu={menu}
      mobileMenuVisible={mobileMenuVisible}
      handleUiMobileMenuVisible={handleUiMobileMenuVisible}
    />
  );
}

export default Menu;
