import { IAction } from '@redux/models';
import { IPage } from '@client/types';

export interface IPageState extends IPage {
}

export interface ISetPageAction extends IAction {
  payload: IPage;
}
