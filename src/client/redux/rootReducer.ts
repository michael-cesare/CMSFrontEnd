import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';

import viewModel from './nodeState/reducer';
import page from './page/reducer';
import uiVisibility from './uiVisibility/reducer';

const rootReducer = combineReducers( {
  viewModel,
  page,
  uiVisibility,
} );

export default rootReducer;
