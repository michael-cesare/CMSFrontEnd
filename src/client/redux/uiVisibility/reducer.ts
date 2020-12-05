import update from 'immutability-helper';

import { IBooleanAction } from '@redux/models';

import reducerUtil from '@client/utils/reducer.util';

import { IUiVisibility } from './models';
import ownTypes from './types';

const initialState: IUiVisibility = {
  mobileMenuVisible: false,
};

const setMobileMenuVisible = ( state: IUiVisibility, { payload }: IBooleanAction ) => update( state, {
  mobileMenuVisible: { $set: payload },
} );

const resetState = ( state: IUiVisibility ) => update( state, {
  mobileMenuVisible: { $set: initialState.mobileMenuVisible },
} );

export default reducerUtil( initialState, {
  [ownTypes.SET_MOBILE_MENU_VISIBLE]: setMobileMenuVisible,
  [ownTypes.RESET]:                   resetState,
} );
