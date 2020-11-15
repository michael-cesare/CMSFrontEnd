import { IAction } from '@redux/models';
import { IPage } from '@client/types';

import { ISetPageAction } from './models';
import ownTypes from './types';

export const initPage = (): IAction => ( {
  type:    ownTypes.INIT,
} );

export const setPage = ( page: IPage ): ISetPageAction => ( {
  type:    ownTypes.SET_PAGE,
  payload: page,
} );
