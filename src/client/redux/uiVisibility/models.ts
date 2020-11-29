import { IAction } from '@redux/models';

export interface IUiVisibility {
  mobileMenuVisible: boolean
}

export interface ISetPageAction extends IAction {
  payload: IUiVisibility;
}
