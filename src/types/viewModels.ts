import { IFetchResponse } from '@srcTypes/models';

export interface IPostVM {
  menu: IFetchResponse;
  post: IFetchResponse;
  posts: IFetchResponse;
}

export interface IPageVM {
  menu: IFetchResponse;
  page: IFetchResponse;
}

export interface IVMNodeState {
  viewModel: {
    menu: IFetchResponse;
    post: IFetchResponse;
    posts: IFetchResponse;
    page: IFetchResponse;
  }
}

export interface IVMNodeStore {
  value: IVMNodeState | any | undefined;
}
