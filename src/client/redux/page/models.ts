import { IAction } from '@redux/models';

export interface IPageState {
  type: string
}

export interface ISetPageTypeAction extends IAction {
  payload: string;
}
