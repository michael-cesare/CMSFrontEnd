
import { Action } from 'redux';

import { IVMNodeState, IVMNodeStore } from '@srcTypes/viewModels';
import { IPageState } from '@redux/page/models';

/**
 * The CoreSate is the initial state from rehydration of persistance state that
 * are prefilled by Node server
 */
export interface IAppState extends IVMNodeState {
  page: IPageState;
};

/**
 * This is the state of react-redux extended with all UI State
 */
export interface IAppStore extends IVMNodeStore {
  value: IAppState;  
  dispatch: any;
}

export interface IAction extends Action<any> {
  payload?: any;
}
