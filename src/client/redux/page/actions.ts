import { IAction } from '@redux/models';

import { ISetPageTypeAction } from './models';
import ownTypes from './types';

export const initPage = (): IAction => ( {
  type:    ownTypes.INIT,
} );

export const setPageType = ( pageType: string ): ISetPageTypeAction => ( {
  type:    ownTypes.SET_PAGE_TYPE,
  payload: pageType,
} );
