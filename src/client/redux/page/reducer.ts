import update from 'immutability-helper';

import reducerUtil from '@client/utils/reducer.util';

import { IPageState } from './models';
import ownTypes from './types';

const initialState: IPageState = {
  type: ''
};

const setPageType = ( state: IPageState, pageType: string ) => update( state, {
  type: { $set: pageType }
} );

const resetState = ( state: IPageState ) => update( state, {
  type: { $set: initialState.type },
} );

export default reducerUtil( initialState, {
  [ownTypes.SET_PAGE_TYPE]: setPageType,
  [ownTypes.RESET]:         resetState,
} );
