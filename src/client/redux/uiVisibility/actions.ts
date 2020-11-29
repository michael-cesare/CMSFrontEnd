import { IBooleanAction, IAction } from '@redux/models';

import ownTypes from './types';

export const setUiMobileMenuVisible = ( isVisible: boolean ): IBooleanAction => ( {
  type:    ownTypes.SET_MOBILE_MENU_VISIBLE,
  payload: isVisible,
} );

export const resetUiVisibilityState = (): IAction => ( {
  type:    ownTypes.RESET,
} );
