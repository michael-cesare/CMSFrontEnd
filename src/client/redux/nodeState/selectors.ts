import { IAppState } from '@redux/models';

import { IWPPage, IWPMenu } from '@srcTypes/models';
import { IPageVM } from '@srcTypes/viewModels';


export const pageDataSel = ( state: IAppState ): IWPPage => {
  const pageVM = state.viewModel as IPageVM;

  return pageVM.page.data as IWPPage;
}

export const pageMenuSel = ( state: IAppState ): IWPMenu => {
  const pageVM = state.viewModel as IPageVM;
  const pageData = pageVM.menu.data;

  return pageData as IWPMenu;
}

export const VMPageTypeSel = ( state: IAppState ): string => {
  const pageVM = state.viewModel as IPageVM;
  const pageData = pageVM.page.data as IWPPage;

  return pageData.type;
}
