import update from 'immutability-helper';

import reducerUtil from '@client/utils/reducer.util';

import { IPageState, ISetPageAction } from './models';
import ownTypes from './types';

const initialState: IPageState = {
  type:     '',
  domNodes: [],
};

const setPage = ( state: IPageState, { payload }: ISetPageAction ) => update( state, {
  type:     { $set: payload.type },
  domNodes: { $set: payload.domNodes }
} );

const resetState = ( state: IPageState ) => update( state, {
  type:     { $set: initialState.type },
  domNodes: { $set: initialState.domNodes }
} );

export default reducerUtil( initialState, {
  [ownTypes.SET_PAGE]: setPage,
  [ownTypes.RESET]:    resetState,
} );
