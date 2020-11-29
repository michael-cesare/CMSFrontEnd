import React, { FC } from "react";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { IAppState, IBooleanAction } from '@redux/models';

import { setUiMobileMenuVisible } from '@client/redux/uiVisibility/actions';

import { pageMenuSel } from '@client/redux/nodeState/selectors';
import { mobileMenuVisibleSel } from '@client/redux/uiVisibility/selectors';

import { IWPMenu } from '@srcTypes/models';

import Menu from '@client/components/Menu/Menu';

interface IOwnReduxStateProps {
  menu: IWPMenu;
  mobileMenuVisible: Boolean;
}

interface IOwnReduxDispatchProps {
  handleUiMobileMenuVisible: (isVisible: boolean) => IBooleanAction;
}

type TAllProps = IOwnReduxStateProps & IOwnReduxDispatchProps;

const Header: FC<TAllProps> = (props: TAllProps) => {
  const { menu, mobileMenuVisible, handleUiMobileMenuVisible } = props;

  return (
    <div className="page-header">
      <Menu
        menu={menu}
        mobileMenuVisible={mobileMenuVisible}
        handleUiMobileMenuVisible={handleUiMobileMenuVisible}
      />
    </div>
  );
}

const mapStateToProps = (state: IAppState): IOwnReduxStateProps => ({
  menu: pageMenuSel(state),
  mobileMenuVisible: mobileMenuVisibleSel(state),
})

const mapDispatchToProps = (dispatch: Dispatch): IOwnReduxDispatchProps => bindActionCreators({
  handleUiMobileMenuVisible: (isVisible: boolean) => setUiMobileMenuVisible(isVisible),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

