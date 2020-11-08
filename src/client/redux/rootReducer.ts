import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';

import viewModel from './nodeState/reducer';
import page from './page/reducer';

const rootReducer = combineReducers( {
  viewModel,
  page,
} );

export default rootReducer;
